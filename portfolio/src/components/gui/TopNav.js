import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';

// links: [{ label, href }] for in-page anchors or [{ label, to }] for routes.
const NavItem = ({ link, onClick }) => (
  link.to
    ? <Link className="gui-navlink" to={link.to} onClick={onClick}>{link.label}</Link>
    : <a className="gui-navlink" href={link.href} onClick={onClick}>{link.label}</a>
);

const TopNav = ({ links, terminalTo = '/terminal' }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when switching back to desktop layout.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <nav className="gui-topnav glass-strong" aria-label="Portfolio sections">
      <span className="dots" aria-hidden="true">
        <span className="dot" style={{ background: '#ff5f57' }} />
        <span className="dot" style={{ background: '#ffbd2e' }} />
        <span className="dot" style={{ background: '#28c840' }} />
      </span>
      <Link className="prompt" to="/" style={{ fontSize: 13, textDecoration: 'none' }}>raihan@uc:~</Link>
      {isMobile ? (
        <>
          <button
            className="gui-hamburger"
            aria-expanded={menuOpen}
            aria-controls="gui-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
          {menuOpen && (
            <div id="gui-mobile-menu" className="gui-mobile-menu glass-strong">
              {links.map((l) => <NavItem key={l.label} link={l} onClick={() => setMenuOpen(false)} />)}
            </div>
          )}
        </>
      ) : (
        <>
          {links.map((l) => <NavItem key={l.label} link={l} />)}
          <Link className="gui-navlink" to={terminalTo} style={{ marginLeft: 'auto' }}>&gt;_ terminal</Link>
        </>
      )}
    </nav>
  );
};

export default TopNav;
