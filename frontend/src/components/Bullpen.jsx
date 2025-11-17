import { useState, useRef, useEffect } from "react";
import { RiHomeLine } from "react-icons/ri";
import PlayerSelect from "./PlayerSelect";
import PitchCharts from "./test_PitchCharts";
import PitchInsights from "./test_PichInsights";
import "./SideBySideAnalysis.css";

function Bullpen({ slot, selectedPlayerId, setSelectedPlayerId, pitchData, className }) {
  const [selectedChart, setSelectedChart] = useState("usage");
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const button = container.querySelector(`button.active`);
    if (button) {
      setSliderStyle({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
    }
  }, [selectedChart]);

  const handleSelect = (playerId) => {
    if (!playerId) {
      setSelectedPlayerId("");
      return;
    }
    setSelectedPlayerId(playerId);
  };

  const selectedData = selectedPlayerId ? pitchData[selectedPlayerId] : null;

  const buttons = [
    { id: "usage", label: "Usage" },
    { id: "veloSpin", label: "Velocity/Spin" },
    { id: "movement", label: "Movement" },
    { id: "batted", label: "Hits" },
  ];

  return (
      <div className={`field-container ${className}`}>
        <div className="grass-background">

          <div className="mound-select">
            <div className="mound">
              {selectedData && (
                <img src={selectedData.pitcher.image}
                    alt={`${selectedData.pitcher.name_use} ${selectedData.pitcher.name_last}`}
                    className="player-image"
                />
              )}

            </div>
            <PlayerSelect
              players={Object.values(pitchData).map((p) => p.pitcher)}
              onSelect={handleSelect}
              />
          </div>

          {/* --- Right: Player Info --- */}
          <div className="player-info-section">
            {selectedData ? (
              <>
                <ul className="player-stats">
                  <div className="info-column1">
                    <li><strong>Throws:</strong> {selectedData.pitcher.throws}</li>
                    <li><strong>Team:</strong> {selectedData.pitcher.team}</li>
                  </div>
                  <div className="info-column">
                    <li><strong>Height:</strong> {selectedData.pitcher.height}</li>
                    <li><strong>Weight:</strong> {selectedData.pitcher.weight}</li>
                  </div>
                  <div className="info-column3">
                    <li><strong>Age:</strong> {selectedData.pitcher.age}</li>
                    <li><strong>Draft:</strong> {selectedData.pitcher.draft}</li>
                  </div>
                </ul>
              </>
            ) : (
              <p className="no-player-text">Select a pitcher to view details</p>
            )}
          </div>


          <div className="home-icon-container">
            {/* could hold RiHomeLine or other UI elements */}
            <RiHomeLine />
          </div>


        </div>
      </div>

  );
}

export default Bullpen;
