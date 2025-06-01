// src/App.js

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FeedsPage from './pages/feeds';
import Email from './pages/emailpage';
import Calendar from './pages/Calendar';
import Notes from './pages/notes';
import Files from './pages/files';
import Clock from './pages/clock';
import Profile from './pages/Profile';
import WidgetDirectory from './pages/WidgetDirectory';
import ThemeEditor from './components/ThemeEditor';
import ChatPage from './pages/chat';
import Reminders from './pages/reminders';
import UnifiedFeeds from './pages/unified';
import InstagramFeed from './pages/instagram';
import TwitterFeed from './pages/twitter';
import FacebookFeed from './pages/facebook';
import RedditFeed from './pages/reddit';
import TrendingTopics from './pages/trending';
import YouTubeFeeds from './pages/youtube';
import MusicDiscovery from './pages/music';
import PodcastRecommendations from './pages/podcasts';
import SearchPage from './pages/Search';

function NatureBackdrop() {
  const images = [
    'https://source.unsplash.com/1920x1080/?nature,water',
    'https://source.unsplash.com/1920x1080/?mountain,scenic',
    'https://source.unsplash.com/1920x1080/?forest,path',
    'https://source.unsplash.com/1920x1080/?sunrise,landscape',
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}

function AppContent() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoggedIn && isLoginPage && <NatureBackdrop />}
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/feeds" element={<ProtectedRoute><FeedsPage /></ProtectedRoute>} />
            <Route path="/email" element={<ProtectedRoute><Email /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
            <Route path="/files" element={<ProtectedRoute><Files /></ProtectedRoute>} />
            <Route path="/clock" element={<ProtectedRoute><Clock /></ProtectedRoute>} />
            <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
            <Route path="/unified" element={<ProtectedRoute><UnifiedFeeds /></ProtectedRoute>} />
            <Route path="/instagram" element={<ProtectedRoute><InstagramFeed /></ProtectedRoute>} />
            <Route path="/twitter" element={<ProtectedRoute><TwitterFeed /></ProtectedRoute>} />
            <Route path="/facebook" element={<ProtectedRoute><FacebookFeed /></ProtectedRoute>} />
            <Route path="/reddit" element={<ProtectedRoute><RedditFeed /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/trending" element={<ProtectedRoute><TrendingTopics /></ProtectedRoute>} />
            <Route path="/youtube" element={<ProtectedRoute><YouTubeFeeds /></ProtectedRoute>} />
            <Route path="/music" element={<ProtectedRoute><MusicDiscovery /></ProtectedRoute>} />
            <Route path="/podcasts" element={<ProtectedRoute><PodcastRecommendations /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/widget-library" element={<ProtectedRoute><WidgetDirectory /></ProtectedRoute>} />
            <Route path="/theme-editor" element={<ProtectedRoute><ThemeEditor /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
