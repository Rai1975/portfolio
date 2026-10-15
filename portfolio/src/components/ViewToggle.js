import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const ViewToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isTerminal = location.pathname.startsWith('/terminal');

  // Terminal mode is desktop-only — hide the toggle entirely on mobile.
  if (isMobile) return null;

  const flip = () => {
    const next = isTerminal ? '/' : '/terminal';
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
