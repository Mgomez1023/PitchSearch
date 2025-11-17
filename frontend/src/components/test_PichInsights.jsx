import "./PitchInsights.css";

function PitchInsights({ summary, type }) {
  if (!summary || summary.length === 0) return null;

  // Helper functions
  const max = (key) =>
    summary.reduce((a, b) => (a[key] || 0) > (b[key] || 0) ? a : b);

  const min = (key) =>
    summary.reduce((a, b) => (a[key] || Infinity) < (b[key] || Infinity) ? a : b);

  const totalPitches = summary.reduce((sum, p) => sum + (p.pitch_count || 0), 0);

  // Movement magnitude
  const movementMagnitude = (p) =>
    Math.sqrt((p.avg_hbreak || 0) ** 2 + (p.avg_vbreak || 0) ** 2);

  const highestMovement = summary.reduce((a, b) =>
    movementMagnitude(a) > movementMagnitude(b) ? a : b
  );

  const mostUsedPitch = max("pitch_count");
  const leastUsedPitch = min("pitch_count");

  const usagePercentages = summary.map(p => ({
    ...p,
    pct: (p.pitch_count / totalPitches) * 100
  }));

  const topTwoTotal = usagePercentages
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 2)
    .reduce((sum, p) => sum + p.pct, 0);

  const numAbove20 = usagePercentages.filter(p => p.pct >= 20).length;
  const rarePitches = usagePercentages.filter(p => p.pct < 5);

  // Balanced vs reliant
  const isBalanced = usagePercentages.every(p => p.pct < 35);
  const heavilyReliesOnOne = mostUsedPitch.pitch_count / totalPitches > 0.45;

  const maxHBreak = max("avg_hbreak");
  const maxVBreak = max("avg_vbreak");
  const highestMovementPitch = summary.reduce((a, b) =>
    movementMagnitude(a) > movementMagnitude(b) ? a : b
  );
  const lowestMovementPitch = summary.reduce((a, b) =>
    movementMagnitude(a) < movementMagnitude(b) ? a : b
  );

  // Gap from average movement
  const avgHBreak = summary.reduce((sum, p) => sum + (p.avg_hbreak || 0), 0) / summary.length;
  const avgVBreak = summary.reduce((sum, p) => sum + (p.avg_vbreak || 0), 0) / summary.length;
  const extremePitch = summary.reduce((a, b) =>
    Math.abs(movementMagnitude(b) - Math.sqrt(avgHBreak**2 + avgVBreak**2)) >
    Math.abs(movementMagnitude(a) - Math.sqrt(avgHBreak**2 + avgVBreak**2))
      ? b
      : a
  );
  
  const hardestContact = max("avg_exit_speed");
  const weakestContact = min("avg_exit_speed");
  const highestLaunch = max("avg_launch_angle");

  const avgExit = (summary.reduce((sum, p) => sum + (p.avg_exit_speed || 0), 0) / summary.length).toFixed(1);
  const avgLaunch = (summary.reduce((sum, p) => sum + (p.avg_launch_angle || 0), 0) / summary.length).toFixed(1);

  // Identify most extreme deviation from average EV
  const extremeEV = summary.reduce((a, b) => 
    Math.abs((b.avg_exit_speed || 0) - avgExit) > Math.abs((a.avg_exit_speed || 0) - avgExit) ? b : a
  );

  // Chart-specific insight sets
  const insightsByType = {
    usage: [
      {
        label: "Pitch mix balance",
        value: isBalanced
          ? "Very balanced mix — no pitch over 35%"
          : heavilyReliesOnOne
          ? `${mostUsedPitch.pitch_type} heavy — over 45% usage`
          : `Leans on ${mostUsedPitch.pitch_type}`
      },
      {
        label: "Pitches used ≥ 20% of the time",
        value: numAbove20
      },
      {
      label: "Two-pitch reliance",
        value:
          topTwoTotal > 70
          ? `Top two pitches = ${topTwoTotal.toFixed(1)}% of usage`
          : `Low — top two pitches only ${topTwoTotal.toFixed(1)}%`
      },
    ],

    veloSpin: [
      {
        label: "Fastest pitch",
        value: `${max("avg_speed").pitch_type} (${max("avg_speed").avg_speed} mph)`
      },
      {
        label: "Highest spin",
        value: `${max("avg_spin").pitch_type} (${max("avg_spin").avg_spin} rpm)`
      },
      {
        label: "Biggest speed–spin gap",
        value: (() => {
          let maxGapPitch = summary.reduce((a, b) =>
            Math.abs(a.avg_speed - a.avg_spin / 100) >
            Math.abs(b.avg_speed - b.avg_spin / 100)
              ? a
              : b
          );
          return `${maxGapPitch.pitch_type}`;
        })()
      }
    ],

    movement: [
      {
        label: "Most arm-side run",
        value: `${maxHBreak.pitch_type} (${maxHBreak.avg_hbreak} in)`
      },
      {
        label: "Most vertical drop",
        value: `${maxVBreak.pitch_type} (${maxVBreak.avg_vbreak} in)`
      },
      {
        label: "Most total movement",
        value: `${highestMovementPitch.pitch_type} (${movementMagnitude(highestMovementPitch).toFixed(1)} in combined)`
      },
      {
        label: "Pitch with extreme movement gap",
        value: `${extremePitch.pitch_type} (deviates most from average)`
      }
    ],

    batted: [
      {
        label: "Hardest contact allowed",
        value: `${hardestContact.pitch_type} (${hardestContact.avg_exit_speed} mph EV)`
      },
      {
        label: "Weakest contact",
        value: `${weakestContact.pitch_type} (${weakestContact.avg_exit_speed} mph EV)`
      },
      {
        label: "Highest launch angle",
        value: `${highestLaunch.pitch_type} (${highestLaunch.avg_launch_angle}°)`
      },
      {
        label: "Average exit velocity",
        value: `${avgExit} mph`
      },
      {
        label: "Average launch angle",
        value: `${avgLaunch}°`
      },
      {
        label: "Most extreme EV deviation",
        value: `${extremeEV.pitch_type} (${extremeEV.avg_exit_speed} mph EV)`
      }
    ]
  };

  const insights = insightsByType[type] || [];

  return (
    <div className="chart-insights-box">
      <h3>Key Insights</h3>
      <ul>
        {insights.map((insight, i) => (
          <li key={i}>
            <strong>{insight.label}:</strong> {insight.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PitchInsights;
