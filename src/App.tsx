import React from 'react';
import { HashRouter, BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import DocumentationPage from './pages/DocumentationPage';
import SetupPage from './pages/SetupPage';
import TutorialPage from './pages/TutorialPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Profile from './pages/Profile'; 
import AuthPage from './components/AuthPage';

// Helper to check if running in Electron
const isDesktopApp = () => {
  return navigator.userAgent.toLowerCase().includes('electron');
};

// Use HashRouter for Electron (Desktop) to avoid file path errors, BrowserRouter for Web
const Router = isDesktopApp() ? HashRouter : BrowserRouter;

// Protected Route Wrapper: Ensures user has completed setup before seeing the Editor
const RequireSetup: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  // Check both setup and auth keys to be safe
  const isSetupComplete = localStorage.getItem('zekodes_setup_complete') === 'true';
  
  if (isDesktopApp() && !isSetupComplete) {
    // If not ready, send them to Auth first (or Setup)
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// The Home Route Logic
const HomeRoute = () => {
  if (isDesktopApp()) {
    // 1. Check if they have finished the intro/auth flow
    const isSetupComplete = localStorage.getItem('zekodes_setup_complete') === 'true';
    
    // 2. If finished, go to Editor. If NOT finished, go to Auth Page.
    if (isSetupComplete) {
      return <Navigate to="/editor" replace />;
    } else {
      return <Navigate to="/auth" replace />;
    }
  }
  // If Web, show Landing Page
  return <LandingPage />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route 1: Home - Decides where to send the user (Landing vs Auth vs Editor) */}
        <Route path="/" element={<HomeRoute />} />

        {/* Route 2: Auth - The Login/Welcome Screen */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Route 3: Setup - Specific setup steps if needed */}
        <Route path="/setup" element={<SetupPage />} />
        
        {/* Other Pages */}
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/profile" element={<Profile />} />

        {/* Route 4: The Main Editor - Protected by RequireSetup */}
        <Route 
          path="/editor" 
          element={
            <RequireSetup>
              <EditorPage />
            </RequireSetup>
          } 
        />

        {/* Fallback: Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;