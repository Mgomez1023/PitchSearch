from db import get_db_connection

def get_all_pitchers():
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT player_id, name_use, name_last
        FROM players
        WHERE player_id IN (SELECT DISTINCT pitcher_id FROM pitches)
        ORDER BY name_last
    """).fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_pitch_summary(pitcher_id):
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT 
            pitch_type,
            pitch_type_abbrev,
            COUNT(*) AS pitch_count,
            ROUND(AVG(release_speed), 1) AS avg_speed,
            ROUND(AVG(horizontal_break), 2) AS avg_hbreak,
            ROUND(AVG(induced_vertical_break), 2) AS avg_vbreak,
            ROUND(AVG(spin_rate), 0) AS avg_spin,
            ROUND(AVG(hit_exit_speed), 1) AS avg_exit_speed,
            ROUND(AVG(hit_launch_angle), 1) AS avg_launch_angle
        FROM pitches
        WHERE pitcher_id = ?
        GROUP BY pitch_type_abbrev
        ORDER BY pitch_count DESC
    """, (pitcher_id,)).fetchall()
    conn.close()
    return [dict(row) for row in rows]