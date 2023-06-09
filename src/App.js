import { NavBar } from "./Components/NavBar";
import PlayerSelection from "./Components/PlayerSelection";
import Teams from "./Components/Teams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OneVOne from "./Components/OneVOne";
import BoxScore from "./Components/BoxScore";
import PlayerList from "./Components/PlayerList";
import Standings from "./Components/Standings";
import Hero from "./Components/Hero";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="1on1" element={<OneVOne />} />
          <Route path="players" element={<PlayerList />} />
          <Route path="boxscore" element={<BoxScore />} />
          <Route path="teams" element={<Teams />} />
          <Route path="player_selection" element={<PlayerSelection />} />
          <Route path="standings" element={<Standings />} />
          <Route path="players" element={<PlayerList />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
