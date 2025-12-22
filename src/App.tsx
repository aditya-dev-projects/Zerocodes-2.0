import React from 'react';
import { HashRouter, BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import DocumentationPage from './pages/DocumentationPage';
import SetupPage from './pages/SetupPage';
import TutorialPage from './pages/TutorialPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AuthPage from './components/AuthPage';

const isDesktopApp = () => {
  return navigator.userAgent.toLowerCase().includes('electron');
};

const Router = isDesktopApp() ? HashRouter : BrowserRouter;

const RequireSetup: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const isSetupComplete = localStorage.getItem('zekodes_setup_complete') === 'true';

  if (isDesktopApp() && !isSetupComplete) {
    return <Navigate to="/setup" state={{ from: location }} replace />;
  }

  return children;
};

const HomeRoute = () => {
  if (isDesktopApp()) {
    const isSetupComplete = localStorage.getItem('zekodes_setup_complete') === 'true';
    if (!isSetupComplete) return <Navigate to="/setup" replace />;
    return <Navigate to="/editor" replace />;
  }
  return <LandingPage />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/editor" 
          element={
            <RequireSetup>
              <EditorPage />
            </RequireSetup>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;