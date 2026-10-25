import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { blogTerminalPath } from '../hooks/useBlog';

const ViewToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isTerminal = location.pathname.startsWith('/terminal');

  // Terminal mode is desktop-only — hide the toggle entirely on mobile.
  if (isMobile) return null;

  const flip = () => {
    let next = isTerminal ? '/' : '/terminal';
    // Carry the blog context across: /blog/foo <-> `blog foo` in the terminal.
    const blogMatch = location.pathname.match(/^\/blog(?:\/([^/]+))?\/?$/);
    if (!isTerminal && blogMatch) next = blogTerminalPath(blogMatch[1]);
    if (isTerminal) {
      const run = new URLSearchParams(location.search).get('run') || '';
      const runMatch = run.match(/^blog(?:\s+(\S+))?$/);
      if (runMatch) next = runMatch[1] ? `/blog/${runMatch[1]}` : '/blog';
    }
    try {
      localStorage.setItem('portfolio-view', isTerminal ? 'gui' : 'terminal');
    } catch {
      /* storage unavailable — still navigate */
    }
    navigate(next);
  };

  return (
    <button
      className="gui-view-toggle"
      onClick={flip}
      aria-label={isTerminal ? 'Switch to graphical UI view' : 'Switch to terminal view'}
      title={isTerminal ? 'Back to UI view' : 'Try the terminal view'}
    >
      <span className="pulse" aria-hidden="true" />
      {isTerminal ? '◎ UI view' : '>_ Terminal'}
    </button>
  );
};

export default ViewToggle;
