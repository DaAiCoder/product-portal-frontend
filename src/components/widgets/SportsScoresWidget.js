"use client";

import React, { useState, useEffect } from "react";

export default function SportsScoresWidget() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      try {
        const res = await fetch("/api/sports");
        const json = await res.json();
        setGames(json.games || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Today's NBA Games</h3>
      {loading ? (
        <p>Loading games…</p>
      ) : games.length ? (
        <div className="space-y-2 max-h-48 overflow-auto">
          {games.map((g, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {g.visitor_team.abbreviation} @{" "}
                {g.home_team.abbreviation}
              </span>
              <span>
                {g.visitor_team_score} – {g.home_team_score}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>No games today.</p>
      )}
    </div>
  );
}
