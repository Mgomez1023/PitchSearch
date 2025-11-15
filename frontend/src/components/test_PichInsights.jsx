import "./PitchInsights.css";

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

  return (
    <div className="insights-box">
      <h3>Key Insights</h3>
      <ul>
        <li>Most used pitch: {mostUsed.pitch_type} ({mostUsed.pitch_count} thrown)</li>
        <li>Fastest pitch: {fastest.pitch_type} ({fastest.avg_speed} mph)</li>
        <li>Highest spin: {highestSpin.pitch_type} ({highestSpin.avg_spin} rpm)</li>
      </ul>
    </div>
  );
}

export default PitchInsights;
