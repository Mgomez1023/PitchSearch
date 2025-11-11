from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load the cached data at startup
base_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(base_dir, "pitch_data_cache.json")) as f:
    PITCH_DATA = json.load(f)

@app.route("/api/pitchers")
def pitchers():
    # Return just the pitcher info
    return jsonify([data["pitcher"] for data in PITCH_DATA.values()])

@app.route("/api/pitch-summary/<int:pitcher_id>")
def pitch_summary(pitcher_id):
    data = PITCH_DATA.get(str(pitcher_id))
    if not data:
        return jsonify({"error": "Pitcher not found"}), 404
    return jsonify(data["summary"])

if __name__ == "__main__":
    app.run(debug=True)