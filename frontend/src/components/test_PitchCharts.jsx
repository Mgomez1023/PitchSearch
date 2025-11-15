import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ScatterChart, Scatter, ZAxis, Legend
} from "recharts";
import "./PitchCharts.css";

const COLORS = ["#BA0C2F", "#84c72dff", "#041E42", "#7A99AC", "#FFB81C", "#8C8C8C"];

function PitchCharts({ summary, type }) {
  if (!summary || summary.length === 0) return null;

  const total = summary.reduce((sum, p) => sum + (p.pitch_count || 0), 0);

  switch (type) {
    case "usage":
      return (
        <PieChart width={500} height={250}>
          <Pie
            data={summary.map((p) => ({
              name: p.pitch_type,
              value: p.pitch_count,
            }))}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {summary.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );

    case "veloSpin":
      return (
        <BarChart width={500} height={250} data={summary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pitch_type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar className="bar-label" dataKey="avg_speed" fill="#BA0C2F" name="Avg Speed (mph)" />
          <Bar className="bar-label" dataKey="avg_spin" fill="#041E42" name="Avg Spin (rpm)" />
        </BarChart>
      );

    case "movement":
      return (
        <ScatterChart width={500} height={250}>
          <CartesianGrid />
          <XAxis dataKey="avg_hbreak" name="H. Break (in)" />
          <YAxis dataKey="avg_vbreak" name="V. Break (in)" />
          <ZAxis dataKey="pitch_count" range={[60, 400]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={summary} fill="#BA0C2F" />
        </ScatterChart>
      );

    case "batted":
      return (
        <BarChart width={500} height={250} data={summary}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pitch_type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg_exit_speed" fill="#FFB81C" name="Exit Velo" />
          <Bar dataKey="avg_launch_angle" fill="#041E42" name="Launch Angle" />
        </BarChart>
      );

    default:
      return null;
  }
}

export default PitchCharts;