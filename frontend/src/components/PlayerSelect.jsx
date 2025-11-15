import { useState, useRef, useEffect } from "react";
import "./PlayerSelect.css";

function PlayerSelect({ players, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (player) => {
    setSelectedPlayer(player);
    onSelect(player.player_id);
    setIsOpen(false);
  };

  return (
    <div className="player-select" ref={dropdownRef}>
      <button
        className="player-select-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedPlayer
          ? `${selectedPlayer.name_use} ${selectedPlayer.name_last}`
          : "Choose a Pitcher"}
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="player-dropdown">
          {players.map((p) => (
            <div
              key={p.player_id}
              className={`player-option ${
                selectedPlayer?.player_id === p.player_id ? "active" : ""
              }`}
              onClick={() => handleSelect(p)}
            >
              <div className="player-info">
                <span className="player-name">
                  {p.name_use} {p.name_last}
                </span>
                {p.team && <span className="player-team">{p.team}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerSelect;
