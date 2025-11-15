import "./TableInsights.css";

function PitchInsights({ summary }) {
  if (!summary || summary.length === 0) return null;

  const mostUsed = summary.reduce((a, b) =>
    (a.pitch_count || 0) > (b.pitch_count || 0) ? a : b
  );

  const fastest = summary.reduce((a, b) =>
    (a.avg_speed || 0) > (b.avg_speed || 0) ? a : b
  );

  const highestSpin = summary.reduce((a, b) =>
    (a.avg_spin || 0) > (b.avg_spin || 0) ? a : b
  );

  const mostHBreak = summary.reduce((a, b) =>
    (a.avg_hbreak || 0) > (b.avg_hbreak || 0) ? a : b
  );

  const mostVBreak = summary.reduce((a, b) =>
    (a.avg_vbreak || 0) > (b.avg_vbreak || 0) ? a : b
  );

  const hardestHit = summary.reduce((a, b) =>
    (a.avg_exit_speed || 0) > (b.avg_exit_speed || 0) ? a : b
  );

  const weakestContact = summary.reduce((a, b) =>
    (a.avg_exit_speed || Infinity) < (b.avg_exit_speed || Infinity) ? a : b
  );

  return (
    <div className="table-insights-box">
      <h3>At a glance:</h3>
      <ul>
        <div className="insights-column">
          <li>Most used pitch: {mostUsed.pitch_type} ({mostUsed.pitch_count} thrown)</li>
          <li>Fastest pitch: {fastest.pitch_type} ({fastest.avg_speed} mph)</li>
          <li>Highest spin: {highestSpin.pitch_type} ({highestSpin.avg_spin} rpm)</li>
        </div>
        <div className="insights-column">
          <li>Most horizontal break: {mostHBreak.pitch_type} ({mostHBreak.avg_hbreak} in)</li>
          <li>Most vertical break: {mostVBreak.pitch_type} ({mostVBreak.avg_vbreak} in)</li>
          <li>Hardest contact allowed: {hardestHit.pitch_type} ({hardestHit.avg_exit_speed} mph EV)</li>

        </div>
          <li>Weakest contact: {weakestContact.pitch_type} ({weakestContact.avg_exit_speed} mph EV)</li>
      </ul>
    </div>
  );
}

export default PitchInsights;
