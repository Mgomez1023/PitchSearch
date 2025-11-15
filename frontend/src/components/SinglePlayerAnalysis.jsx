import { useState, useRef, useEffect } from "react";
import { RiHomeLine } from "react-icons/ri";
import PlayerSelect from './PlayerSelect';
import PitchTable from './PitchTable';
import PitchSummaryTable from "./test_PitchSummaryTable";
import PitchCharts from "./test_PitchCharts";
import PitchInsights from "./test_PichInsights"
import TableInsights from "./TableInsights";
import ChartSelector from './ChartSelector';
import pitchData from '../assets/pitch_data_cache.json';
import './SinglePlayerAnalysis.css';
import "./ChartSelector.css";

function SinglePlayerAnalysis() {
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [selectedChart, setSelectedChart] = useState("usage");

  const buttons = [
    { id: "usage", label: "Usage %" },
    { id: "veloSpin", label: "Velocity/Spin" },
    { id: "movement", label: "Movement" },
    { id: "batted", label: "Batted Ball" },
  ];

  const containerRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

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
      setSelectedPlayerId('');
      return;
    }
    setSelectedPlayerId(playerId);
  };

  const selectedData = selectedPlayerId ? pitchData[selectedPlayerId] : null;

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">Single Player Analysis</h2>

      <div className={`analysis-content ${selectedData ? 'shifted' : ''}`}>
        <div className="field-container">
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

        {selectedData && (
          <div className="pitch-table-container">

            <div className="data-container">

              <div className="chart-selector" ref={containerRef}>
                <div
                  className="chart-slider"
                  style={{
                    left: `${sliderStyle.left}px`,
                    width: `${sliderStyle.width}px`,
                  }}
                />
                {buttons.map((btn) => (
                  <button
                    key={btn.id}
                    className={`chart-button ${
                      selectedChart === btn.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedChart(btn.id)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="data-content">

                <div className="chart-section">
                  <PitchCharts summary={selectedData.summary} type={selectedChart} />
                </div>

                <PitchInsights summary={selectedData.summary} />
              </div>
            </div>


            <div className="pitch-summary-table-container"> 
              <h3 className="summary-table-title">Summary Table</h3>
              <PitchSummaryTable summary={selectedData.summary} />
              <TableInsights summary={selectedData.summary} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default SinglePlayerAnalysis;


