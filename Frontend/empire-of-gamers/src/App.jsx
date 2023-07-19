import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Vip from "./components/User/Vip";
import Ranking from "./components/GlobalRanking/Ranking";
import AboutUs from "./components/AboutUs";
import ProfileDetails from "./components/User/ProfileDetails";
import GameDetails from "./components/Games/GameDetails";
import Navbar from "./components/Nav/Navbar";
import Friend from "./components/Friend/Friend";
import { Container } from "react-bootstrap";
import ProfileSettings from "./components/User/ProfileSettings";
import Login from "./components/Login-Signup/Login";
import SignUp from "./components/Login-Signup/SignUp";
import Social from "./components/Social/Social";

function App() {
  return (
    <Container fluid className="px-0 bg-home-ranking ">
      <BrowserRouter>
        <Navbar />
        <Friend />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vip" element={<Vip />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/profile-settings/:id" element={<ProfileSettings />} />
          <Route path="/game/:idGame" element={<GameDetails />} />
          <Route path="/social" element={<Social />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
