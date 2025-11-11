import './PitchTable.css';

function PitchTable({ summary }) {
  return (
    <table className="pitch-table">
      <thead>
        <tr>
          <th>Pitch Type</th>
          {/*<th>Abbrev</th> */}
          <th>Count</th>
          <th>Avg Speed (mph)</th>
          <th>Avg Spin (rpm)</th>
          <th>H. Break (in)</th>
          <th>V. Break (in)</th>
        </tr>
      </thead>
      <tbody>
        {summary.map((pitch, i) => (
          <tr key={i}>
            <td>{pitch.pitch_type || '-'}</td>
            {/*<td>{pitch.pitch_type_abbrev || '-'}</td>*/}
            <td>{pitch.pitch_count}</td>
            <td>{pitch.avg_speed?.toFixed(1) ?? '-'}</td>
            <td>{pitch.avg_spin?.toFixed(0) ?? '-'}</td>
            <td>{pitch.avg_hbreak?.toFixed(2) ?? '-'}</td>
            <td>{pitch.avg_vbreak?.toFixed(2) ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PitchTable;