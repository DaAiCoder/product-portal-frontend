// File: src/App.js
import Feeds from './pages/Feeds';
…
<Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/"
    element={
      <ProtectedRoute><Home /></ProtectedRoute>
    }
  />
+ <Route
+   path="/feeds"
+   element={
+     <ProtectedRoute><Feeds /></ProtectedRoute>
+   }
+ />
  <Route
    path="/profile"
    element={
      <ProtectedRoute><Profile /></ProtectedRoute>
    }
  />
</Routes>
