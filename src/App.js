// File: src/App .js

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FeedsPage from './pages/feeds';            // ← feeds.js for News
import Email from './pages/emailpage';
import Calendar from './pages/calendar';
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Home */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* News (replaces old /rss) */}
            <Route
              path="/feeds"
              element={
                <ProtectedRoute>
                  <FeedsPage />
                </ProtectedRoute>
              }
            />

            {/* Productivity */}
            <Route
              path="/email"
              element={
                <ProtectedRoute>
                  <Email />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/files"
              element={
                <ProtectedRoute>
                  <Files />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clock"
              element={
                <ProtectedRoute>
                  <Clock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reminders"
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              }
            />

            {/* Social Feeds */}
            <Route
              path="/unified"
              element={
                <ProtectedRoute>
                  <UnifiedFeeds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instagram"
              element={
                <ProtectedRoute>
                  <InstagramFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/twitter"
              element={
                <ProtectedRoute>
                  <TwitterFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/facebook"
              element={
                <ProtectedRoute>
                  <FacebookFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reddit"
              element={
                <ProtectedRoute>
                  <RedditFeed />
                </ProtectedRoute>
              }
            />

            {/* Chat */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* News sub-page: Trending */}
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <TrendingTopics />
                </ProtectedRoute>
              }
            />

            {/* Video & Media */}
            <Route
              path="/youtube"
              element={
                <ProtectedRoute>
                  <YouTubeFeeds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/music"
              element={
                <ProtectedRoute>
                  <MusicDiscovery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/podcasts"
              element={
                <ProtectedRoute>
                  <PodcastRecommendations />
                </ProtectedRoute>
              }
            />

            {/* Profile & Widgets */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/widget-library"
              element={
                <ProtectedRoute>
                  <WidgetDirectory />
                </ProtectedRoute>
              }
            />

            {/* Theme Editor */}
            <Route
              path="/theme-editor"
              element={
                <ProtectedRoute>
                  <ThemeEditor />
                </ProtectedRoute>
              }
            />

            {/* Catch-all: redirect unknowns */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
