// src/pages/music.js
import React, { useState, useRef, useEffect } from 'react';

// Dummy track list; swap in your real data later
const songs = [
  {
    id: 1,
    title: 'Smooth Jazz Evening',
    artist: 'Jazz Ensemble',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Chill Vibes',
    artist: 'LoFi Beats',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Upbeat Pop',
    artist: 'Top Charts',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  // …add more as needed
];

export default function MusicDiscovery() {
  const [current, setCurrent] = useState(null);
  const audioRef = useRef(null);

  // Whenever `current` changes, load & play
  useEffect(() => {
    if (!audioRef.current) return;
    if (current) {
      audioRef.current.src = current.src;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [current]);

  return (
    <div className="p-6 pb-24"> {/* pb-24 to avoid overlap with player */}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Music Discovery</h1>
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="font-semibold">{song.title}</div>
              <div className="text-gray-500 text-sm">{song.artist}</div>
            </div>
            <button
              onClick={() => setCurrent(song)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              {current?.id === song.id ? 'Playing…' : 'Play'}
            </button>
          </div>
        ))}
      </div>

      {/* Fixed Music Player */}
      {current && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner p-4 flex items-center justify-between z-50">
          <div>
            <div className="font-semibold">{current.title}</div>
            <div className="text-gray-500 text-sm">{current.artist}</div>
          </div>
          <audio controls ref={audioRef} className="flex-1 mx-4" />
          <button
            onClick={() => {
              audioRef.current.pause();
              setCurrent(null);
            }}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
      )}
    </div>
);
}

