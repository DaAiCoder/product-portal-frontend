// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import FeedsPage from './pages/feeds';
import Dashboard from './pages/Dashboard';
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
