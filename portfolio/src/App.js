import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Terminal from './pages/About-me';
import GuiHome from './components/gui/GuiHome';
import WhyDidYouDoThat from './pages/Error';
import ViewToggle from './components/ViewToggle';
import './styles/gui.css';

// If the user previously chose terminal, honor it on root visits.
// Defaults to GUI view otherwise.
const DefaultRoute = () => {
  const location = useLocation();
  if (location.pathname !== '/') return <GuiHome />;
  // Deep anchor links (e.g. /#projects from legacy routes) always stay in GUI.
  if (location.hash) return <GuiHome />;
  try {
    if (localStorage.getItem('portfolio-view') === 'terminal') {
      return <Navigate to="/terminal" replace />;
    }
  } catch {
    /* ignore storage errors */
  }
  return <GuiHome />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultRoute />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/error" element={<WhyDidYouDoThat />} />
        {/* Legacy terminal-era routes now live inside the single GUI page */}
        <Route path="/experiences" element={<Navigate to="/#experiences" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/class" element={<Navigate to="/#coursework" replace />} />
        <Route path="/about" element={<Navigate to="/terminal" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ViewToggle />
    </Router>
  );
};

export default App;
