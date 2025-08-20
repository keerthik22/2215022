import { Routes, Route, Link } from "react-router-dom";
import { Container, Button } from "@mui/material";
import UrlShortener from "./components/UrlShortener.jsx";
import StatsPage from "./components/StatsPage.jsx";
import RedirectPage from "./components/RedirectPage.jsx";

function App() {
  return (
    <Container>
      <div style={{ margin: "20px 0" }}>
        <Button component={Link} to="/" variant="contained">
          Shortener
        </Button>
        <Button
          component={Link}
          to="/stats"
          variant="outlined"
          style={{ marginLeft: "10px" }}
        >
          Stats
        </Button>
      </div>

      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </Container>
  );
}

export default App;
