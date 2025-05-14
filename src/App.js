// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FeedsPage from './pages/feeds';
import Email from './pages/Email';
import Calendar from './pages/Calendar';
import Notes from './pages/notes';
import Files from './pages/files';
import Clock from './pages/clock';
import Profile from './pages/Profile';
import WidgetDirectory from './pages/WidgetDirectory';
import ThemeEditor from './components/ThemeEditor';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Onboarding (protected) */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Home (protected) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Dashboard (protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Feeds (protected) */}
            <Route
              path="/feeds"
              element={
                <ProtectedRoute>
                  <FeedsPage />
                </ProtectedRoute>
              }
            />

            {/* Email (protected) */}
            <Route
              path="/email"
              element={
                <ProtectedRoute>
                  <Email />
                </ProtectedRoute>
              }
            />

            {/* Calendar (protected) */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />

            {/* Notes (protected) */}
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />

            {/* Files (protected) */}
            <Route
              path="/files"
              element={
                <ProtectedRoute>
                  <Files />
                </ProtectedRoute>
              }
            />

            {/* Clock (protected) */}
            <Route
              path="/clock"
              element={
                <ProtectedRoute>
                  <Clock />
                </ProtectedRoute>
              }
            />

            {/* Profile (protected) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Widget Directory (protected) */}
            <Route
              path="/widgets"
              element={
                <ProtectedRoute>
                  <WidgetDirectory />
                </ProtectedRoute>
              }
            />

            {/* Theme Editor (protected) */}
            <Route
              path="/theme"
              element={
                <ProtectedRoute>
                  <ThemeEditor />
                </ProtectedRoute>
              }
            />

            {/* Redirect any unknown path to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
