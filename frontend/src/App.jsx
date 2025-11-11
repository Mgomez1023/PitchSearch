import { useState } from 'react';
import PlayerSelect from './components/PlayerSelect';
import PitchTable from './components/PitchTable';
import Banner from './components/Banner';
import SinglePlayerAnalysis from './components/SinglePlayerAnalysis';
import logo from './assets/natLogo.svg';
import './App.css';
import pitchData from './assets/pitch_data_cache.json';

function App() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handleSelect = (playerId) => {
    setSelectedPlayerId(playerId);
  };

  const handleMenuClick = () => {
    alert("Menu Clicked!");
  }

  const selectedData = selectedPlayerId ? pitchData[selectedPlayerId] : null;

  return (
    <>
      <Banner logoSrc={logo} titleText="PitchSearch" onMenuClick={handleMenuClick} />

      <div className="app-container">

        <SinglePlayerAnalysis />

      </div>
    </>
  );
}

export default App;