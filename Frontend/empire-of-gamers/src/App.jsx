import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Vip from "./components/Vip";
import Ranking from "./components/Ranking";
import AboutUs from "./components/AboutUs";
import ProfileDetails from "./components/ProfileDetails";
import GameDetails from "./components/GameDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vip" element={<Vip />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
