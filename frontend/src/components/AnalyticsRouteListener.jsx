import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/analytics";

export default function AnalyticsRouteListener() {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
}
