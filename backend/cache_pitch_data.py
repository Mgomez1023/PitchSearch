import json
from db import get_db_connection
from queries import get_pitch_summary

# The 10 pitchers you care about
pitchers = [
    {"name_use": "Logan", "name_last": "Webb", "player_id": 657277},
    {"name_use": "Carlos", "name_last": "Rodón", "player_id": 607074},
    {"name_use": "Garrett", "name_last": "Crochet", "player_id": 676979},
    {"name_use": "Zac", "name_last": "Gallen", "player_id": 668678},
    {"name_use": "Max", "name_last": "Fried", "player_id": 608331},
    {"name_use": "Jake", "name_last": "Irvin", "player_id": 663623},  # adjust IDs as needed
    {"name_use": "MacKenzie", "name_last": "Gore", "player_id": 669022},
    {"name_use": "Brad", "name_last": "Lord", "player_id": 641745},
    {"name_use": "Jose A.", "name_last": "Ferrer", "player_id": 678606}, # adjust IDs
    {"name_use": "Matt", "name_last": "Waldron", "player_id": 663362}
]

cached_data = {}

for pitcher in pitchers:
    pid = pitcher["player_id"]
    cached_data[pid] = {
        "pitcher": pitcher,
        "summary": get_pitch_summary(pid)
    }

# Save to a JSON file
with open("pitch_data_cache.json", "w") as f:
    json.dump(cached_data, f, indent=2)

print("✅ Cached pitch data saved to pitch_data_cache.json")