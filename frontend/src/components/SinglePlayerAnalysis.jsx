import { useState } from 'react';
import { RiHomeLine } from "react-icons/ri";
import PlayerSelect from './PlayerSelect';
import PitchTable from './PitchTable';
import './SinglePlayerAnalysis.css';
import pitchData from '../assets/pitch_data_cache.json';

function SinglePlayerAnalysis() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handleSelect = (playerId) => {
    setSelectedPlayerId(playerId);
  };

  const selectedData = selectedPlayerId ? pitchData[selectedPlayerId] : null;

  return (
    <>
      <h1 className="analysis-title">Single Player Analysis</h1>
      <div className="single-analysis">
          <div className="background">
            <div className="grass-background">

              <div className="mound">
                <PlayerSelect
                    players={Object.values(pitchData).map((p) => p.pitcher)}
                    onSelect={handleSelect}
                />
              </div>

              <div className="table-container">
                {selectedData && <PitchTable summary={selectedData.summary} />}
              </div>

              <div className="home-icon-container">
                <RiHomeLine className="home-icon" />
              </div>

            </div>
          </div>
      </div>
    </>
  );
}

export default SinglePlayerAnalysis;