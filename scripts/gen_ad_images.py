import asyncio
import os
import base64
import traceback
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv('/app/backend/.env')
API_KEY = os.getenv('EMERGENT_LLM_KEY')

STYLE = ("Ultra photorealistic cinematic photograph, dark luxury European mood, "
         "deep charcoal and black tones with warm champagne-gold light accents, dusk or night, "
         "subtle film grain, high-end private chauffeur advertisement aesthetic, "
         "no text, no logos, no watermark, no license plate readable")

PROMPTS = [
    ("gen_ncc_duomo", "A black Mercedes S-Class sedan parked in Piazza del Duomo in Milan at blue hour, "
     "the illuminated gothic cathedral in the background, a professional chauffeur in an elegant dark suit "
     "opening the rear door, wet cobblestones with warm golden reflections of street lamps. " + STYLE),
    ("gen_transfer_aeroporto", "A black Mercedes sedan with headlights on parked at a modern airport terminal "
     "curbside at dawn, airport control tower silhouette against a golden-orange sunrise sky, "
     "a professional chauffeur in dark suit standing beside the open rear door. " + STYLE),
    ("gen_autista_disposizione", "A black Mercedes E-Class parked on Via Monte Napoleone luxury shopping street "
     "in Milan at night, warm boutique window lights, a chauffeur in dark tailored suit holding the car door open "
     "for an elegant passenger, refined Italian evening atmosphere. " + STYLE),
    ("gen_eventi_fashion", "A black luxury Mercedes V-Class van in front of an elegant historic Milanese palazzo "
     "hosting an exclusive evening fashion event, warm light from the entrance, subtle red carpet, "
     "doorman in formal attire, night scene. " + STYLE),
    ("gen_business", "A professional chauffeur in a dark suit standing beside a black Mercedes sedan in the "
     "Porta Nuova business district of Milan at dusk, modern glass skyscrapers with warm lights, "
     "corporate executive atmosphere. " + STYLE),
    ("gen_lunga_percorrenza", "A black Mercedes van driving on a scenic lakeside road at Lake Como at golden "
     "sunset, Italian mountains and elegant villas across the water, warm light, serene luxury travel mood. " + STYLE),
]

async def gen(name, prompt):
    chat = LlmChat(api_key=API_KEY, session_id=f"img-{name}", system_message="You are an expert advertising photographer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)
    if images:
        data = base64.b64decode(images[0]['data'])
        path = f"/app/ad-assets/raw_{name}.png"
        with open(path, "wb") as f:
            f.write(data)
        print(f"OK {name} {len(data)} bytes", flush=True)
    else:
        print(f"NO IMAGE {name}: {text[:100] if text else 'empty'}", flush=True)

async def main():
    for name, prompt in PROMPTS:
        try:
            await gen(name, prompt)
        except Exception as e:
            print(f"ERR {name}: {str(e)[:150]}", flush=True)
            traceback.print_exc()

asyncio.run(main())
print("DONE")
