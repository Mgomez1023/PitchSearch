const API_BASE = "http://localhost:5000/api";

export async function fetchPitchers() {
    const result = await fetch('${API_BASE}/pitchers');
    console.log("result: ", result);
    return result.json();
}

export async function fetchPitchSummary(pitcherID) {
    const result = await fetch('${API_BASE}/pitch-summary/${pitcherId}');
    console.log("Pitch SUMMARY Results: ", result);
    return result.json();
}
