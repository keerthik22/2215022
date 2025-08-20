import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../utils/logger.js"; 

function RedirectPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls")) || [];
    const found = stored.find((u) => u.code === code);

    if (!found) {
      alert("Short URL not found");
      logEvent("error", "redirect", `Shortcode ${code} not found`); 
      navigate("/");
      return;
    }

    if (new Date(found.expiry) < new Date()) {
      alert("Link expired!");
      logEvent("warn", "redirect", `Shortcode ${code} expired`);
      navigate("/");
      return;
    }

    const click = {
      time: new Date().toISOString(),
      source: document.referrer || "direct",
      location: "unknown"
    };
    found.clicks.push(click);

    localStorage.setItem("shortUrls", JSON.stringify(stored));

    logEvent("info", "redirect", `Redirected using shortcode ${code}`);
    window.location.href = found.longUrl;
  }, [code, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;
