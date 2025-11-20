import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 1. DEFAULT ROUTE (/) -> Editor Page 
           This ensures that when the app opens, it goes straight to the project.
           The EditorPage handles authentication internally (shows AuthPage if not logged in).
        */}
        <Route path="/" element={<EditorPage />} />
        
        {/* 2. LANDING PAGE (/about)
           We move the landing page to a separate route, just in case you still 
           want it accessible (e.g., for marketing purposes later).
        */}
        <Route path="/about" element={<LandingPage />} />
        
        {/* 3. Fallback - Redirects unknown URLs to the main project */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;