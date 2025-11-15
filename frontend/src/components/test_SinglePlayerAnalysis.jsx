import { useState } from "react";
import PlayerSelect from "./PlayerSelect";
import PitchSummaryTable from "./test_PitchSummaryTable";
import PitchCharts from "./test_PitchCharts";
import PitchInsights from "./test_PichInsights";
import pitchData from "../assets/pitch_data_cache.json";
import "./test_SinglePlayerAnalysis.css";

function SinglePlayerAnalysis() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedChart, setSelectedChart] = useState("usage");

  const handleSelect = (playerId) => {
    setSelectedPlayerId(playerId || null);
  };

  const selectedData = selectedPlayerId ? pitchData[selectedPlayerId] : null;

  return (
    <div className="single-player-analysis">
      <h2 className="title">MLB 2025 Pitcher Analysis Dashboard</h2>

      <PlayerSelect
        players={Object.values(pitchData).map((p) => p.pitcher)}
        onSelect={handleSelect}
      />

      {selectedData ? (
        <div className="analysis-content">
          <div className="table-section">
            <PitchSummaryTable summary={selectedData.summary} />
          </div>

          <div className="chart-section">
            <div className="chart-selector">
              <button onClick={() => setSelectedChart("usage")}>Usage %</button>
              <button onClick={() => setSelectedChart("veloSpin")}>Velocity/Spin</button>
              <button onClick={() => setSelectedChart("movement")}>Movement</button>
              <button onClick={() => setSelectedChart("batted")}>Batted Ball</button>
            </div>
            <PitchCharts summary={selectedData.summary} type={selectedChart} />
            <PitchInsights summary={selectedData.summary} />
          </div>
        </div>
      ) : (
        <p className="placeholder">Select a pitcher to view analysis.</p>
      )}
    </div>
  );
}

export default SinglePlayerAnalysis;