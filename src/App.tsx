import React from 'react';
// CHANGE THIS IMPORT: Switch from BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import DocumentationPage from './pages/DocumentationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;