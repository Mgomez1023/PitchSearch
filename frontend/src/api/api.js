const API_BASE = "http://localhost:5000/api";

export async function fetchPitchers() {
  const res = await fetch(`${API_BASE}/pitchers`);
  return res.json();
}

export async function fetchPitchSummary(pitcherId) {
  const res = await fetch(`${API_BASE}/pitch-summary/${pitcherId}`);
  return res.json();
}
