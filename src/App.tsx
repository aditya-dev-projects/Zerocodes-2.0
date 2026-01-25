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
import CreateProfile from './pages/CreateProfile'; //

// Helper to check if running in Electron
const isDesktopApp = () => {
  return navigator.userAgent.toLowerCase().includes('electron');
};

// Use HashRouter for Electron (Desktop) to avoid file path errors, BrowserRouter for Web
const Router = isDesktopApp() ? HashRouter : BrowserRouter;

// Protected Route Wrapper: Ensures user has completed setup before seeing the Editor
const RequireSetup: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const isSetupComplete = localStorage.getItem('zekodes_setup_complete') === 'true';
  
  // If desktop app and not setup, force profile creation
  if (isDesktopApp() && !isSetupComplete) {
    return <Navigate to="/create-profile" state={{ from: location }} replace />;
  }

  return children;
};

// The Home Route Logic
const HomeRoute = () => {
  if (isDesktopApp()) {
    // DESKTOP: Skip Landing Page. Go to Auth or Editor.
    const isSetupComplete = localStorage.getItem('zekodes_setup_complete') === 'true';
    if (isSetupComplete) {
      return <Navigate to="/editor" replace />;
    } else {
      return <Navigate to="/auth" replace />;
    }
  }
  // WEB: Show Landing Page
  return <LandingPage />;
};

const App: React.FC = () => {
  const inDesktop = isDesktopApp();

  return (
    <Router>
      <Routes>
        {/* Route 1: Home - Smart switching between Landing and App */}
        <Route path="/" element={<HomeRoute />} />

        {/* Public Pages (Docs, Privacy, etc.) - Available on both */}
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />

        {/* APP-ONLY ROUTES:
          If we are in the Desktop App, allow access.
          If we are on the Web, redirect to Home (Landing Page).
        */}
        {inDesktop ? (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/create-profile" element={<CreateProfile />} /> {/* */}
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route 
              path="/editor" 
              element={
                <RequireSetup>
                  <EditorPage />
                </RequireSetup>
              } 
            />
          </>
        ) : (
          // WEB FALLBACK: Redirect app routes to Home
          <>
            <Route path="/auth" element={<Navigate to="/" replace />} />
            <Route path="/create-profile" element={<Navigate to="/" replace />} /> {/* */}
            <Route path="/setup" element={<Navigate to="/" replace />} />
            <Route path="/profile" element={<Navigate to="/" replace />} />
            <Route path="/editor" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Fallback: Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;