import asyncio
import os
import base64
import time
import subprocess
import traceback
import requests
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage
import imageio_ffmpeg

load_dotenv('/app/backend/.env')
API_KEY = os.getenv('EMERGENT_LLM_KEY')
JOB = "063db827-6438-45b8-8441-bfe2d6d60658"
BASE = os.environ.get('INTEGRATION_PROXY_URL', 'https://integrations.emergentagent.com').rstrip('/')
CONTROL = f"{BASE}/api/v1/fal"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json", "X-App-ID": JOB, "X-Job-ID": JOB}
EP = "fal-ai/bytedance/seedance/v1/pro/image-to-video"
REF_PATH = "/app/frontend/public/ads/ref_malpensa_van.png"
REF_URL = "https://premium-ncc-milano.preview.emergentagent.com/ads/ref_malpensa_van.png"
RAW_VIDEO = "/tmp/commercial_raw.mp4"
FINAL_VIDEO = "/app/frontend/public/ads/commercial_malpensa_7s.mp4"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

IMG_PROMPT = ("Outside the Arrivals terminal at Milano Malpensa Airport at sunset: a glossy black luxury "
              "Mercedes V-Class chauffeur van parked at the curb, side profile view facing right, sliding door closed. "
              "A professional male chauffeur in an elegant black suit, white shirt and black tie stands beside the van. "
              "Warm sunset reflections on the glossy black paint, illuminated airport terminal in the background, "
              "realistic reflections on slightly wet pavement. Luxury commercial photography, cinematic, photorealistic, "
              "deep black and champagne-gold tones, no text, no logos, no readable license plates")

VIDEO_PROMPT = ("Slow cinematic dolly-in toward the black Mercedes V-Class van parked at Milano Malpensa arrivals at sunset, "
                "slightly low angle, shallow depth of field. The chauffeur in his black suit notices a well-dressed business "
                "client approaching from the terminal pulling a premium rolling suitcase. The chauffeur takes one smooth step "
                "toward the van and elegantly opens the sliding passenger door, making a subtle welcoming gesture. The client "
                "approaches the open door while the chauffeur stays discreet and professional. Natural realistic human movement, "
                "warm sunset reflections on the glossy black paint, terminal lights glowing in the background, realistic "
                "reflections on slightly wet pavement. No camera shake, stable vehicle geometry, the van remains the hero.")


def step(msg):
    print(f"[{time.strftime('%H:%M:%S')}] {msg}", flush=True)


async def gen_reference():
    step("generazione immagine di riferimento...")
    chat = LlmChat(api_key=API_KEY, session_id="video-ref", system_message="You are an expert advertising photographer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=IMG_PROMPT))
    if not images:
        raise RuntimeError(f"no image: {str(text)[:100]}")
    with open(REF_PATH, "wb") as f:
        f.write(base64.b64decode(images[0]['data']))
    step("immagine salvata")
    for _ in range(10):
        r = requests.head(REF_URL, timeout=15)
        if r.status_code == 200:
            step("immagine raggiungibile pubblicamente")
            return
        time.sleep(3)
    raise RuntimeError("immagine non raggiungibile via URL pubblico")


def submit_video():
    step("invio job video a Seedance 1.0 Pro...")
    payload = {"prompt": VIDEO_PROMPT, "image_url": REF_URL, "resolution": "720p", "duration": "10", "aspect_ratio": "16:9", "camera_fixed": False}
    r = requests.post(f"{CONTROL}/proxy", headers={**HEADERS, "X-Fal-Target-Url": f"https://queue.fal.run/{EP}"}, json=payload, timeout=60)
    if r.status_code == 402:
        raise RuntimeError("Crediti insufficienti sulla chiave universale")
    r.raise_for_status()
    sub = r.json()
    step(f"job accettato: {sub.get('request_id', '?')}")
    return sub["status_url"], sub["response_url"]


def poll(status_url, response_url):
    deadline = time.monotonic() + 900
    while time.monotonic() < deadline:
        r = requests.get(status_url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        body = r.json()
        status = (body.get("status") or "").upper()
        step(f"stato: {status}")
        if status in {"COMPLETED", "OK"}:
            res = requests.get(response_url, headers=HEADERS, timeout=60)
            res.raise_for_status()
            return res.json()
        if status in {"FAILED", "CANCELLED", "CANCELED", "ERROR"}:
            raise RuntimeError(f"generazione fallita: {body}")
        time.sleep(8)
    raise RuntimeError("timeout attesa video")


def download_and_finish(result):
    video = result.get("video") or {}
    url = video.get("url")
    if not url:
        raise RuntimeError(f"nessun url video nel risultato: {str(result)[:200]}")
    step("download video...")
    data = requests.get(url, timeout=120).content
    with open(RAW_VIDEO, "wb") as f:
        f.write(data)
    step(f"video grezzo: {len(data)} bytes")
    fade = "if(lt(t,5.2),0,if(lt(t,6),(t-5.2)/0.8,1))"
    font = "/app/ad-assets/fonts/CormorantGaramond.ttf"
    sans = "/app/ad-assets/fonts/PlusJakartaSans.ttf"
    filters = (
        f"[0:v]trim=0:7,setpts=PTS-STARTPTS,"
        f"drawtext=fontfile={font}:text='FIRST MILANO':fontcolor=0xF5F4F0:fontsize=64:x=(w-text_w)/2:y=h*0.62:alpha='{fade}',"
        f"drawtext=fontfile={sans}:text='PRIVATE CHAUFFEUR SERVICE':fontcolor=0xD4AF37:fontsize=22:x=(w-text_w)/2:y=h*0.62+85:alpha='{fade}',"
        f"drawtext=fontfile={font}:text='Your journey. Our priority.':fontcolor=0xF5F4F0:fontsize=34:fontstyle=Italic:x=(w-text_w)/2:y=h*0.62+130:alpha='{fade}'[v]"
    )
    cmd = [FFMPEG, "-y", "-i", RAW_VIDEO, "-filter_complex", filters, "-map", "[v]", "-map", "0:a?", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", FINAL_VIDEO]
    subprocess.run(cmd, check=True, capture_output=True)
    step(f"video finale 7s salvato: {FINAL_VIDEO}")


async def main():
    await gen_reference()
    status_url, response_url = submit_video()
    result = poll(status_url, response_url)
    download_and_finish(result)
    step("COMPLETATO")


try:
    asyncio.run(main())
except Exception as e:
    step(f"ERRORE: {e}")
    traceback.print_exc()
