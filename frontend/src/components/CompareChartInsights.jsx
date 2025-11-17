import "./SideBySideAnalysis.css";

function sumPitches(summary) {
  return summary.reduce((s, p) => s + (p.pitch_count || 0), 0) || 1;
}

function movementMagnitude(p) {
  return Math.sqrt((p.avg_hbreak || 0) ** 2 + (p.avg_vbreak || 0) ** 2);
}

function maxBy(summary, key) {
  return summary.reduce((a, b) => (a[key] || 0) > (b[key] || 0) ? a : b);
}

function minBy(summary, key) {
  return summary.reduce((a, b) => (a[key] || Infinity) < (b[key] || Infinity) ? a : b);
}

function CompareChartInsights({ summary1, summary2, type }) {
  if (!summary1 || !summary2) return null;

  const insights = [];

  if (type === "usage") {
    const top1 = maxBy(summary1, "pitch_count");
    const top2 = maxBy(summary2, "pitch_count");

    const total1 = sumPitches(summary1);
    const total2 = sumPitches(summary2);

    const top1Pct = ((top1.pitch_count / total1) * 100).toFixed(1);
    const top2Pct = ((top2.pitch_count / total2) * 100).toFixed(1);

    insights.push(`Player 1's most used pitch is ${top1.pitch_type} (${top1Pct}% of pitches).`);
    insights.push(`Player 2's most used pitch is ${top2.pitch_type} (${top2Pct}% of pitches).`);

    const topTwo1 = [...summary1].sort((a,b)=>b.pitch_count-a.pitch_count).slice(0,2).reduce((s,p)=>s+(p.pitch_count||0),0)/total1*100;
    const topTwo2 = [...summary2].sort((a,b)=>b.pitch_count-a.pitch_count).slice(0,2).reduce((s,p)=>s+(p.pitch_count||0),0)/total2*100;

    if (topTwo1 > topTwo2) insights.push(`Player 1 relies more on top-two pitches (${topTwo1.toFixed(1)}% vs ${topTwo2.toFixed(1)}%).`);
    else insights.push(`Player 2 relies more on top-two pitches (${topTwo2.toFixed(1)}% vs ${topTwo1.toFixed(1)}%).`);
  }

  if (type === "veloSpin") {
    const maxVelo1 = maxBy(summary1, "avg_speed");
    const maxVelo2 = maxBy(summary2, "avg_speed");
    const maxSpin1 = maxBy(summary1, "avg_spin");
    const maxSpin2 = maxBy(summary2, "avg_spin");

    insights.push(`Fastest pitch: Player 1 → ${maxVelo1.pitch_type} (${maxVelo1.avg_speed} mph), Player 2 → ${maxVelo2.pitch_type} (${maxVelo2.avg_speed} mph).`);
    insights.push(`Highest spin: Player 1 → ${maxSpin1.pitch_type} (${maxSpin1.avg_spin} rpm), Player 2 → ${maxSpin2.pitch_type} (${maxSpin2.avg_spin} rpm).`);

    // velo-spin gap metric
    const gap1 = summary1.map(p => Math.abs((p.avg_speed || 0) - ((p.avg_spin || 0) / 100))).reduce((a,b)=>Math.max(a,b),0);
    const gap2 = summary2.map(p => Math.abs((p.avg_speed || 0) - ((p.avg_spin || 0) / 100))).reduce((a,b)=>Math.max(a,b),0);

    insights.push(gap1 > gap2 ? "Player 1 exhibits a larger max velo–spin gap." : "Player 2 exhibits a larger max velo–spin gap.");
  }

  if (type === "movement") {
    const highestMovement1 = summary1.reduce((a,b)=>movementMagnitude(a) > movementMagnitude(b) ? a : b);
    const highestMovement2 = summary2.reduce((a,b)=>movementMagnitude(a) > movementMagnitude(b) ? a : b);

    insights.push(`Most movement: Player 1 → ${highestMovement1.pitch_type} (${movementMagnitude(highestMovement1).toFixed(1)} in), Player 2 → ${highestMovement2.pitch_type} (${movementMagnitude(highestMovement2).toFixed(1)} in).`);

    const avgMag1 = (summary1.reduce((s,p)=>s+movementMagnitude(p),0)/summary1.length).toFixed(1);
    const avgMag2 = (summary2.reduce((s,p)=>s+movementMagnitude(p),0)/summary2.length).toFixed(1);

    insights.push(`Average movement magnitude: Player 1 ${avgMag1} in vs Player 2 ${avgMag2} in.`);
  }

  if (type === "batted") {
    const maxExit1 = maxBy(summary1, "avg_exit_speed");
    const maxExit2 = maxBy(summary2, "avg_exit_speed");
    const avgExit1 = (summary1.reduce((s,p)=>s+(p.avg_exit_speed||0),0)/summary1.length).toFixed(1);
    const avgExit2 = (summary2.reduce((s,p)=>s+(p.avg_exit_speed||0),0)/summary2.length).toFixed(1);

    insights.push(`Hardest contact: Player 1 → ${maxExit1.pitch_type} (${maxExit1.avg_exit_speed} mph), Player 2 → ${maxExit2.pitch_type} (${maxExit2.avg_exit_speed} mph).`);
    insights.push(`Avg exit velo: Player 1 ${avgExit1} mph vs Player 2 ${avgExit2} mph.`);
  }

  return (
    <div className="compare-insights-box">
      <h3>Comparison Insights (Graphs)</h3>
      <ul>
        {insights.map((s,i) => <li key={i}><strong>{i+1}.</strong> {s}</li>)}
      </ul>
    </div>
  );
}

export default CompareChartInsights;
