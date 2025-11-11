import './PlayerSelect.css';

function PlayerSelect({ players, onSelect }) {
  const handleChange = (e) => {
    const playerId = e.target.value;
    if (playerId) onSelect(playerId);
  };

  return (
    <div className="player-select">
      <label htmlFor="playerDropdown">Select a Pitcher</label>
      <select id="playerDropdown" onChange={handleChange}>
        <option value=""> Choose a Player </option>
        {players.map((p) => (
          <option key={p.player_id} value={p.player_id}>
            {p.name_use} {p.name_last}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlayerSelect;