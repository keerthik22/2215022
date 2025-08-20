import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";

function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls")) || [];
    setUrls(stored);
  }, []);

  return (
    <div>
      {urls.length === 0 && <p>No URLs created yet.</p>}
      {urls.map((u, i) => (
        <Card key={i} style={{ marginBottom: "10px" }}>
          <CardContent>
            <p><b>Short:</b> {u.shortUrl}</p>
            <p><b>Original:</b> {u.longUrl}</p>
            <p><b>Expiry:</b> {new Date(u.expiry).toLocaleString()}</p>
            <p><b>Clicks:</b> {u.clicks.length}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default StatsPage;
