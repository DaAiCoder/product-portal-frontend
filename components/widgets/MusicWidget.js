// File: src/components/widgets/MusicWidget.js

import React, { useEffect, useState, useRef } from 'react';
import { uploadMusic, fetchTracks, getRecommendations } from '../../api/musicAPI';
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaUpload } from 'react-icons/fa';

export default function MusicWidget() {
  const [tracks, setTracks] = useState([]);
  const [recs, setRecs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(new Audio());

  const loadTracks = async () => {
    try {
      setTracks(await fetchTracks());
    } catch (err) {
      setError(err.message);
    }
  };

  const loadRecs = async () => {
    try {
      setRecs(await getRecommendations());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTracks();
    loadRecs();
    const audio = audioRef.current;
    audio.addEventListener('ended', handleNext);
    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleNext);
    };
  }, []);

  const playTrack = (index) => {
    const track = tracks[index];
    audioRef.current.src = track.url;
    audioRef.current.play();
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (currentIndex !== null) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!tracks.length) return;
    const next = currentIndex === null ? 0 : (currentIndex + 1) % tracks.length;
    playTrack(next);
  };

  const handlePrev = () => {
    if (!tracks.length) return;
    const prev = currentIndex === null
      ? tracks.length - 1
      : (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prev);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadMusic(file);
      await loadTracks();
      e.target.value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaMusic className="mr-1" />
        <strong>Music</strong>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">Error: {error}</div>}
      <label className="flex items-center space-x-1 cursor-pointer text-sm text-blue-600 mb-2">
        <FaUpload />
        <span>Upload</span>
        <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
      </label>
      <div className="flex space-x-2 mb-2">
        <button onClick={handlePrev}><FaStepBackward /></button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNext}><FaStepForward /></button>
      </div>
      <div className="mb-2 text-sm">
        Now Playing: {currentIndex !== null ? tracks[currentIndex]?.title : '—'}
      </div>
      <div className="text-xs text-gray-600 mb-1">Recommendations:</div>
      <ul className="text-xs space-y-1 mb-2 max-h-24 overflow-y-auto">
        {recs.map((t, i) => (
          <li key={t.id} onClick={() => playTrack(i)} className="cursor-pointer hover:underline">
            {t.title}{t.artist && ` — ${t.artist}`}
          </li>
        ))}
      </ul>
      <div className="text-xs text-gray-600">All Tracks:</div>
      <ul className="text-xs space-y-1 max-h-24 overflow-y-auto">
        {tracks.map((t, i) => (
          <li key={t.id} onClick={() => playTrack(i)} className="cursor-pointer hover:underline">
            {t.title}{t.artist && ` — ${t.artist}`}
          </li>
        ))}
      </ul>
    </div>
);
}
