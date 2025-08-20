import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";


function UrlShortener() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [shortUrls, setShortUrls] = useState(
    JSON.parse(localStorage.getItem("shortUrls")) || []
  );

  const handleShorten = () => {
    if (!url.startsWith("http")) {
      alert("Invalid URL");
      return;
    }

    const code = shortcode || Math.random().toString(36).substring(2, 7);
    const validityPeriod = validity ? parseInt(validity) : 30;
    const expiry = new Date(Date.now() + validityPeriod * 60000);

    const newUrl = {
      longUrl: url,
      shortUrl: window.location.origin + "/" + code,
      code,
      expiry: expiry.toISOString(),
      clicks: []
    };

    const updated = [...shortUrls, newUrl];
    setShortUrls(updated);
    localStorage.setItem("shortUrls", JSON.stringify(updated));

    setUrl("");
    setValidity("");
    setShortcode("");
  };

  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <TextField
            label="Original URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Validity (minutes)"
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Custom Shortcode"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleShorten} variant="contained">
            Shorten
          </Button>
        </CardContent>
      </Card>

      {shortUrls.map((item, idx) => (
        <Card key={idx} style={{ marginBottom: "10px" }}>
          <CardContent>
            <p><b>Original:</b> {item.longUrl}</p>
            <p><b>Short:</b> {item.shortUrl}</p>
            <p><b>Expiry:</b> {new Date(item.expiry).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UrlShortener;
