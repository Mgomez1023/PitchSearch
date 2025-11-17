import "./test_PitchSummaryTable.css";

function PitchSummaryTable({ summary, className }) {
  const totalPitches = summary.reduce((sum, p) => sum + (p.pitch_count || 0), 0);

  return (
    <table className={`pitch-summary-table ${className}`}>
      <thead>
        <tr>
          <th>Pitch Type</th>
          <th>Count</th>
          <th>Usage %</th>
          <th>Avg Speed (mph)</th>
          <th>Avg Spin (rpm)</th>
          <th>H. Break (in)</th>
          <th>V. Break (in)</th>
          <th>Exit Velo (mph)</th>
          <th>Launch Angle (°)</th>
        </tr>
      </thead>
      <tbody>
        {summary.map((p) => (
          <tr key={p.pitch_type_abbrev}>
            <td>{p.pitch_type}</td>
            <td>{p.pitch_count}</td>
            <td>{((p.pitch_count / totalPitches) * 100).toFixed(1)}%</td>
            <td>{p.avg_speed ?? "—"}</td>
            <td>{p.avg_spin ?? "—"}</td>
            <td>{p.avg_hbreak ?? "—"}</td>
            <td>{p.avg_vbreak ?? "—"}</td>
            <td>{p.avg_exit_speed ?? "—"}</td>
            <td>{p.avg_launch_angle ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PitchSummaryTable;