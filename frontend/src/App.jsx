import { useState } from 'react';
import PlayerSelect from './components/PlayerSelect';
import PitchTable from './components/PitchTable';
import Banner from './components/Banner';
import SinglePlayerAnalysis from './components/SinglePlayerAnalysis';
import TestSinglePlayerAnalysis from './components/test_SinglePlayerAnalysis';
import SideBySideAnalysis from './components/SideBySideAnalysis';
import logo from './assets/natLogo.svg';
import './App.css';
import pitchData from './assets/pitch_data_cache.json';

function App() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [activeView, setActiveView] = useState("single"); // "single" or "sideBySide"
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelect = (playerId) => {
    setSelectedPlayerId(playerId);
  };

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev); // toggles the slide-out menu
  };

  const selectedData = selectedPlayerId ? pitchData[selectedPlayerId] : null;

  return (
    <>
      <Banner
        logoSrc={logo}
        titleText="PitchSearch"
        onMenuClick={handleMenuClick}
      />

      {/* Slide-out navigation menu */}
      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button
          className={activeView === "single" ? "active" : ""}
          onClick={() => {
            setActiveView("single");
            setMenuOpen(false);
          }}
        >
          Single Player Analysis
        </button>

        <button
          className={activeView === "sideBySide" ? "active" : ""}
          onClick={() => {
            setActiveView("sideBySide");
            setMenuOpen(false);
          }}
        >
          Side-by-Side Analysis
        </button>
      </nav>

      <div className="app-container">
        {activeView === "single" && <SinglePlayerAnalysis />}
        {activeView === "sideBySide" && <SideBySideAnalysis />}
      </div>
    </>
  );
}

export default App;