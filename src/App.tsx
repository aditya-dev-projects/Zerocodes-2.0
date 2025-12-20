import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import DocumentationPage from './pages/DocumentationPage';
import SetupPage from './pages/SetupPage';
import AuthPage from './components/AuthPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route 
          path="/auth" 
          element={!session ? <AuthPage /> : <Navigate to="/editor" />} 
        />
        <Route 
          path="/editor" 
          element={session ? <EditorPage /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;