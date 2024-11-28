import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2e2e2e',
        padding: '10px 20px',
        borderRadius: '0px 0px 0 0',
        fontFamily: 'Consolas, monospace',
      }}
    >
      {/* Three Circles */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#2e2e2e',
          padding: '5px 10px',
          boxSizing: 'border-box',
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
        {!isHomePage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            gap: '20px',
            marginTop: '0px'
          }}
        >
          <Link
            to="/"
            style={{
              color: '#00ff00',
              textDecoration: 'none',
              fontSize: '18px',
              padding: '5px 15px',
              borderRadius: '0px',
            }}
          >
            Home
          </Link>
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
    </nav>
  );
};

export default Navbar;
