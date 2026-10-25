import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import GuiHome from './components/gui/GuiHome';
import WhyDidYouDoThat from './pages/Error';
import ViewToggle from './components/ViewToggle';
import { isMobileDevice } from './hooks/useIsMobile';
import './styles/gui.css';

// Split off the terminal and blog (with marked) so the home page loads lighter.
const Terminal = lazy(() => import('./pages/About-me'));
const BlogIndex = lazy(() => import('./components/gui/BlogIndex'));
const BlogPost = lazy(() => import('./components/gui/BlogPost'));

const RouteFallback = () => (
  <div className="gui-root">
    <div className="gui-inner">
      <div className="gui-state glass">loading…</div>
    </div>
  </div>
);

// If the user previously chose terminal, honor it on root visits.
// Defaults to GUI view otherwise. Mobile always stays in GUI.
const DefaultRoute = () => {
  const location = useLocation();
  if (location.pathname !== '/') return <GuiHome />;
  // Deep anchor links (e.g. /#projects from legacy routes) always stay in GUI.
  if (location.hash) return <GuiHome />;
  if (isMobileDevice()) return <GuiHome />;
  try {
    if (localStorage.getItem('portfolio-view') === 'terminal') {
      return <Navigate to="/terminal" replace />;
    }
  } catch {
    /* ignore storage errors */
  }
  return <GuiHome />;
};

// Terminal has no mobile layout — bounce mobile visitors back to the GUI.
const TerminalRoute = () => {
  if (isMobileDevice()) return <Navigate to="/" replace />;
  return <Terminal />;
};

// Legacy /about pointed at the terminal; keep that on desktop only.
const AboutRedirect = () => {
  if (isMobileDevice()) return <Navigate to="/" replace />;
  return <Navigate to="/terminal" replace />;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<DefaultRoute />} />
          <Route path="/terminal" element={<TerminalRoute />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/error" element={<WhyDidYouDoThat />} />
          {/* Legacy terminal-era routes now live inside the single GUI page */}
          <Route path="/experiences" element={<Navigate to="/#experiences" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/class" element={<Navigate to="/#coursework" replace />} />
          <Route path="/about" element={<AboutRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ViewToggle />
    </Router>
  );
};

export default App;
