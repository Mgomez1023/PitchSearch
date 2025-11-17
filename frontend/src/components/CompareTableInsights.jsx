import "./SideBySideAnalysis.css";

function weightedAverage(summary, key) {
  const total = summary.reduce((s, p) => s + (p.pitch_count || 0), 0) || 1;
  return summary.reduce((sum, p) => sum + ((p[key] || 0) * (p.pitch_count || 0)), 0) / total;
}

function topPitch(summary) {
  const max = summary.reduce((a, b) => (a.pitch_count || 0) > (b.pitch_count || 0) ? a : b);
  return { type: max.pitch_type, pct: ((max.pitch_count / (summary.reduce((s,p)=>s+(p.pitch_count||0),0)||1))*100).toFixed(1) };
}

function CompareTableInsights({ summary1, summary2 }) {
  if (!summary1 || !summary2) return null;

  const avgVelo1 = weightedAverage(summary1, "avg_speed").toFixed(1);
  const avgVelo2 = weightedAverage(summary2, "avg_speed").toFixed(1);

  const avgExit1 = weightedAverage(summary1, "avg_exit_speed").toFixed(1);
  const avgExit2 = weightedAverage(summary2, "avg_exit_speed").toFixed(1);

  const top1 = topPitch(summary1);
  const top2 = topPitch(summary2);

  const insights = [];

  // Velocity comparison
  if (avgVelo1 === avgVelo2) {
    insights.push(`Both pitchers have the same weighted average velocity: ${avgVelo1} mph.`);
  } else {
    const winner = avgVelo1 > avgVelo2 ? "Player 1" : "Player 2";
    const diff = Math.abs(avgVelo1 - avgVelo2).toFixed(1);
    insights.push(`${winner} throws harder on average by ${diff} mph (${avgVelo1} vs ${avgVelo2}).`);
  }

  // Exit velo comparison
  if (avgExit1 === avgExit2) {
    insights.push(`Both allow similar contact quality: avg exit velo ${avgExit1} mph.`);
  } else {
    const winner = avgExit1 < avgExit2 ? "Player 1" : "Player 2";
    const diff = Math.abs(avgExit1 - avgExit2).toFixed(1);
    insights.push(`${winner} allows weaker contact on average by ${diff} mph (${avgExit1} vs ${avgExit2}).`);
  }

  // Top pitch usage
  insights.push(`Player 1's primary pitch: ${top1.type} (${top1.pct}% usage).`);
  insights.push(`Player 2's primary pitch: ${top2.type} (${top2.pct}% usage).`);

  // Mix note
  const balanced1 = top1.pct < 40;
  const balanced2 = top2.pct < 40;
  if (balanced1 && balanced2) insights.push("Both pitchers present relatively balanced pitch mixes.");
  else if (balanced1) insights.push("Player 1 has a balanced mix; Player 2 leans more heavily on their primary pitch.");
  else if (balanced2) insights.push("Player 2 has a balanced mix; Player 1 leans more heavily on their primary pitch.");
  else insights.push("Both pitchers rely heavily on their primary pitch.");

  return (
    <div className="compare-insights-box">
      <h3>Comparison Insights (Tables)</h3>
      <ul>
        {insights.map((s, i) => <li key={i}><strong>{i+1}.</strong> {s}</li>)}
      </ul>
    </div>
  );
}

export default CompareTableInsights;
