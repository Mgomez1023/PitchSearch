import { useState } from "react";
import Bullpen from "./Bullpen";
import PitchSummaryTable from "./test_PitchSummaryTable";
import PitchCharts from "./test_PitchCharts";
import ChartSelector from "./ChartSelector";
import CompareTableInsights from "./CompareTableInsights";
import CompareChartInsights from "./CompareChartInsights";
import pitchData from "../assets/pitch_data_cache.json";
import "./SideBySideAnalysis.css";

function SideBySideAnalysis() {
  const [player1Id, setPlayer1Id] = useState("");
  const [player2Id, setPlayer2Id] = useState("");
  const [viewMode, setViewMode] = useState("tables"); // "tables" | "graphs"
  const [chartType, setChartType] = useState("usage");

  const player1 = player1Id ? pitchData[player1Id] : null;
  const player2 = player2Id ? pitchData[player2Id] : null;

  const bothSelected = player1 && player2;

  return (
    <div className="sbs-container">
      <h2 className="sbs-title">Side-by-side Analysis</h2>

      <div className="sbs-bullpens">
        <Bullpen
          slot={1}
          selectedPlayerId={player1Id}
          setSelectedPlayerId={setPlayer1Id}
          pitchData={pitchData}
          className="bullpen bp-blue"
        />

        <Bullpen
          slot={2}
          selectedPlayerId={player2Id}
          setSelectedPlayerId={setPlayer2Id}
          pitchData={pitchData}
          className="bullpen bp-red"
        />
      </div>

      {/* If two players selected, show the compare controls */}
      {bothSelected && (
        <div className="sbs-compare">
          <div className="sbs-compare-controls">
            <div className="mode-buttons">
              <button
                className={`mode-btn ${viewMode === "tables" ? "active" : ""}`}
                onClick={() => setViewMode("tables")}
              >
                Tables
              </button>
              <button
                className={`mode-btn ${viewMode === "graphs" ? "active" : ""}`}
                onClick={() => setViewMode("graphs")}
              >
                Graphs
              </button>
            </div>

            {/* For graphs mode allow choosing chart type for both charts */}
            {viewMode === "graphs" && (
              <div className="chart-type-selector">
                <ChartSelector selectedChart={chartType} setSelectedChart={setChartType} />
              </div>
            )}
          </div>

          {/* Content */}
          {viewMode === "tables" ? (
            <>
              <div className="sbs-side-by-side">
                <div className="sbs-card card-blue">
                  <h4 className="sbs-player-title">{player1.pitcher.name_use} {player1.pitcher.name_last}</h4>
                  <PitchSummaryTable summary={player1.summary} className="card-blue" />
                </div>
                <div className="sbs-card card-red">
                  <h4 className="sbs-player-title">{player2.pitcher.name_use} {player2.pitcher.name_last}</h4>
                  <PitchSummaryTable summary={player2.summary} />
                </div>
              </div>

              <div className="sbs-compare-insights">
                <CompareTableInsights summary1={player1.summary} summary2={player2.summary} />
              </div>
            </>
          ) : (
            <>
              <div className="sbs-side-by-side">
                <div className="sbs-card card-blue">
                  <h4 className="sbs-player-title">{player1.pitcher.name_use} {player1.pitcher.name_last}</h4>
                  <PitchCharts summary={player1.summary} type={chartType} />
                </div>

                <div className="sbs-card card-red">
                  <h4 className="sbs-player-title">{player2.pitcher.name_use} {player2.pitcher.name_last}</h4>
                  <PitchCharts summary={player2.summary} type={chartType} />
                </div>
              </div>

              <div className="sbs-compare-insights">
                <CompareChartInsights summary1={player1.summary} summary2={player2.summary} type={chartType} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SideBySideAnalysis;
