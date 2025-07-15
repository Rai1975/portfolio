import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      style={{
        position: 'sticky', // Keeps it stuck at the top
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#2e2e2e',
        padding: '10px 20px',
        fontFamily: 'Consolas, monospace',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          width: isMobile ? '90%' : '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          padding: '5px 0px',
          boxSizing: 'border-box',
        }}
      >

        {isMobile && (
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#00ff00',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
        )}

        {/* Three Circles - positioned on right for mobile, left for desktop */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              order: isMobile ? 1 : 0, // This moves circles to the right on mobile
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', marginRight: '8px' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', marginRight: '8px' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
          </div>

        {/* links for Desktop*/}
        {!isMobile && (
          /* Links for Desktop */
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', marginLeft: '20px' }}>
            <Link to="/" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '18px', padding: '5px 15px', borderRadius: '5px' }}>
              Home
            </Link>
            <Link to="/experiences" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '18px', padding: '5px 15px', borderRadius: '5px' }}>
              Experiences
            </Link>
            <Link to="/projects" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '18px', padding: '5px 15px', borderRadius: '5px' }}>
              Projects
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Side Menu with Animation */}
      {isMobile && (
        <>
          {/* Backdrop/Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: isMenuOpen ? 1 : 0,
              visibility: isMenuOpen ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
              zIndex: 1000,
            }}
            onClick={toggleMenu}
          />

          {/* Sidebar */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100%',
              width: '250px',
              backgroundColor: '#2e2e2e',
              padding: '20px',
              boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1001,
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease',
            }}
          >
            <button
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                color: '#00ff00',
                fontSize: '24px',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                marginBottom: '20px',
              }}
            >
              ✕
            </button>
            <Link to="/" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '18px', marginBottom: '10px' }} onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/experiences" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '18px', marginBottom: '10px' }} onClick={toggleMenu}>
              Experiences
            </Link>
            <Link to="/projects" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '18px' }} onClick={toggleMenu}>
              Projects
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;