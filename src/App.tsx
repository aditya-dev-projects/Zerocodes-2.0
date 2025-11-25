import React from 'react';
import { HashRouter, BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import DocumentationPage from './pages/DocumentationPage';
import SetupPage from './pages/SetupPage';

// Helper to detect if running in Electron
const isDesktopApp = () => {
  return navigator.userAgent.toLowerCase().includes('electron');
};

// 1. DYNAMIC ROUTER SELECTION
// Use HashRouter for Desktop App (file:// support)
// Use BrowserRouter for Web (Clean URLs)
const Router = isDesktopApp() ? HashRouter : BrowserRouter;

// Protected Route Component
const RequireSetup: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const isSetupComplete = localStorage.getItem('zerocodes_setup_complete') === 'true';

  if (isDesktopApp() && !isSetupComplete) {
    return <Navigate to="/setup" state={{ from: location }} replace />;
  }

  return children;
};

// 2. SMART HOME COMPONENT
const HomeRoute = () => {
  // A. If running as Desktop App
  if (isDesktopApp()) {
    const isSetupComplete = localStorage.getItem('zerocodes_setup_complete') === 'true';
    
    // If user hasn't finished setup -> Go to Setup
    if (!isSetupComplete) {
      return <Navigate to="/setup" replace />;
    }
    
    // If user finished setup -> Go straight to Editor
    return <Navigate to="/editor" replace />;
  }

  // B. If running on Web -> Show Landing Page
  return <LandingPage />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* This "HomeRoute" decides whether to show Landing Page or App Logic */}
        <Route path="/" element={<HomeRoute />} />
        
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/docs" element={<DocumentationPage />} />

        <Route 
          path="/editor" 
          element={
            <RequireSetup>
              <EditorPage />
            </RequireSetup>
          } 
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;