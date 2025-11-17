import { useState, useRef, useEffect } from "react";
import "./ChartSelector.css";

function ChartSelector({ selectedChart, setSelectedChart }) {
  const buttons = [
    { id: "usage", label: "Usage" },
    { id: "veloSpin", label: "Velocity/Spin" },
    { id: "movement", label: "Movement" },
    { id: "batted", label: "Batted Ball" },
  ];

  const containerRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const button = container.querySelector(`button.active`);
    if (button) {
      setSliderStyle({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
    }
  }, [selectedChart]);

  return (
    <div className="chart-selector" ref={containerRef}>
      <div
        className="chart-slider"
        style={{
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
        }}
      />
      {buttons.map((btn) => (
        <button
          key={btn.id}
          className={`chart-button ${
            selectedChart === btn.id ? "active" : ""
          }`}
          onClick={() => setSelectedChart(btn.id)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default ChartSelector;