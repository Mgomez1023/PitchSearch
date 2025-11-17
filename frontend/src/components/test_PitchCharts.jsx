import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ScatterChart, Scatter, ZAxis, Legend, ReferenceArea
} from "recharts";
import "./PitchCharts.css";

const COLORS = ["#BA0C2F", "#84c72dff", "#041E42", "#7A99AC", "#FFB81C", "#8C8C8C"];

function PitchCharts({ summary, type }) {
  if (!summary || summary.length === 0) return null;

  const total = summary.reduce((sum, p) => sum + (p.pitch_count || 0), 0);

  switch (type) {
    case "usage":
      return (
        <div className="chart-card">
          <h2 className="chart-title">Pitch Usage Breakdown</h2>
          <p className="chart-caption">
            Displays pitch type by percentage thrown.
          </p>

          <PieChart width={400} height={400}>

            <Pie
              data={summary.map((p) => ({
                name: p.pitch_type,
                value: p.pitch_count,
              }))}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
              strong
            >
            {summary.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ marginTop: 50 }}   // ← adds space
            />


        </PieChart>
      </div>

      );

    case "veloSpin":
      return (
        <div className="chart-card">
          <h2 className="chart-title">Velocity vs Spin</h2>
          <p className="chart-caption">
            Displays the gap between Velocity and Spin Rate
          </p>

          <BarChart  width={400} height={300} margin={{ top: 20, right: 20, left: 20 }} data={summary}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="pitch_type" />

            {/* Left axis for velocity */}
            <YAxis
              yAxisId="left"
              label={{ value: "Velocity (mph)", angle: -90, position: "insideLeft" }}
            />

            {/* Right axis for spin */}
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Spin Rate (rpm)", angle: 90, position: "insideRight" }}
            />

            <Tooltip />
            <Legend 
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ marginTop: 50 }}   // ← adds space

            />

            <Bar
              yAxisId="left"
              dataKey="avg_speed"
              fill="#BA0C2F"
              name="Avg Speed (mph)"
              className="bar-label"
            />

            <Bar
              yAxisId="right"
              dataKey="avg_spin"
              fill="#041E42"
              name="Avg Spin (rpm)"
              className="bar-label"
            />
          </BarChart>
        </div>
      );

    case "movement":
      return (
        <div className="chart-card">
          <h2 className="chart-title">Movement Chart</h2>
          <p className="chart-caption">
            Displays where pitches may end up based on horizontal and vertical movement
          </p>

          <ScatterChart width={400} height={350} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />

            {/* Axes: Horizontal and Vertical movement */}
            <XAxis
              type="number"
              dataKey="avg_hbreak"
              name="Horizontal Break (in)"
              domain={[-20, 20]}
              tickCount={9}
              label={{ value: "Horizontal Break (in)", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              type="number"
              dataKey="avg_vbreak"
              name="Vertical Break (in)"
              domain={[0, 40]}
              tickCount={11}
              label={{ value: "Vertical Break (in)", angle: -90, position: "insideLeft" }}
            />

            {/* Strike zone reference */}
            <ReferenceArea
              x1={-8.5} x2={8.5}   // Half of 17-inch plate width
              y1={5} y2={35}        // Vertical height (bottom-top)
              stroke="#041E42"
              strokeWidth={2}
              fill="rgba(4,30,66,0.05)"
            />

            <ZAxis dataKey="pitch_count" range={[60, 400]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            {/* Scatter points by pitch type */}
            {summary.map((p, i) => (
              <Scatter
                key={i}
                data={[p]}
                fill={COLORS[i % COLORS.length]}
                name={p.pitch_type}
              />
            ))}

            <Legend verticalAlign="top" height={70} wrapperStyle={{ marginBottom: 0 }}   // ← adds space
  />
          </ScatterChart>
        </div>

      );

    case "batted":
      return (
        <div className="chart-card">
          <h2 className="chart-title">Hit Pitches</h2>
          <p className="chart-caption">
            Displays average exit velocity and average launch angles
          </p>

          <BarChart width={400} height={300} data={summary} margin={{ top: 20, right: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pitch_type" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" height={32} color="black" />
            <Bar dataKey="avg_exit_speed" fill="#FFB81C" name="Exit Velocity (mph)" />
            <Bar dataKey="avg_launch_angle" fill="#041E42" name="Launch Angle (°)" />
          </BarChart>
        </div>
      );

    default:
      return null;
  }
}

export default PitchCharts;