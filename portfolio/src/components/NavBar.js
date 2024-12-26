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
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2e2e2e',
        padding: '10px 20px',
        fontFamily: 'Consolas, monospace',
        alignItems: 'flex-start',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '5px 10px',
          boxSizing: 'border-box',
        }}
      >
        {/* Three Circles */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f56', // Red
              marginRight: '8px',
            }}
          ></div>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e', // Yellow
              marginRight: '8px',
            }}
          ></div>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#27c93f', // Green
            }}
          ></div>
        </div>

        {/* Hamburger Menu */}
        {isMobile ? (
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#00ff00',
              fontSize: '24px',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            ☰
          </button>
        ) : (
          /* Links for Desktop */
          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'flex-start',
              marginLeft: '20px',
            }}
          >
            {!isHomePage && (
              <Link
                to="/"
                style={{
                  color: '#00ff00',
                  textDecoration: 'none',
                  fontSize: '18px',
                  padding: '5px 15px',
                  borderRadius: '5px',
                }}
              >
                Home
              </Link>
            )}
            <Link
              to="/about"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                fontSize: '18px',
                padding: '5px 15px',
                borderRadius: '5px',
              }}
            >
              About
            </Link>
            <Link
              to="/experiences"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                fontSize: '18px',
                padding: '5px 15px',
                borderRadius: '5px',
              }}
            >
              Experiences
            </Link>
            <Link
              to="/projects"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                fontSize: '18px',
                padding: '5px 15px',
                borderRadius: '5px',
              }}
            >
              Projects
            </Link>
          </div>
        )}
      </div>

      {/* Side Menu for Mobile */}
      {isMenuOpen && isMobile && (
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
            zIndex: 1000,
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
          {!isHomePage && (
            <Link
              to="/"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                fontSize: '18px',
                marginBottom: '10px',
              }}
              onClick={toggleMenu}
            >
              Home
            </Link>
          )}
          <Link
            to="/about"
            style={{
              color: '#00ff00',
              textDecoration: 'none',
              fontSize: '18px',
              marginBottom: '10px',
            }}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/experiences"
            style={{
              color: '#00ff00',
              textDecoration: 'none',
              fontSize: '18px',
              marginBottom: '10px',
            }}
            onClick={toggleMenu}
          >
            Experiences
          </Link>
          <Link
            to="/projects"
            style={{
              color: '#00ff00',
              textDecoration: 'none',
              fontSize: '18px',
            }}
            onClick={toggleMenu}
          >
            Projects
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
