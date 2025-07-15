import React, { useEffect, useState } from 'react';
import Home from './About-me';
import About from './Info';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf, FaHome, FaUser, FaProjectDiagram, FaPhone } from 'react-icons/fa';

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarStyle = {
    width: '60px',
    backgroundColor: '#1e1e1e',
    color: '#00ff00',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
    gap: '20px',
    boxShadow: '0 0 10px #00ff00',
    zIndex: 1,
    position: 'fixed', // Add this
    height: '100vh', // Add this
    top: 0, // Add this
  };

  const iconStyle = {
    fontSize: '20px',
    color: '#00ff00',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100vh',
    backgroundColor: '#1e1e1e',
    overflow: 'hidden',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>
      {/* Left Sidebar: Contacts */}
      {!isMobile && (
        <div style={{ ...sidebarStyle, left: 0,
           overflowY: 'auto',
           marginRight: isMobile ? '0' : '60px' }}>
        <span></span>
        <span></span>
        <span></span>
          <a href="https://github.com/rai1975" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaGithub /></a>
          <a href="https://linkedin.com/in/raihan-rafeek" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaLinkedin /></a>
          <a href="mailto:rafeekrn@mail.uc.edu" style={iconStyle}><FaEnvelope /></a>
          <a href="assets/Raihan_Resume.pdf" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaFilePdf /></a>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', marginLeft: '60px', marginRight: '60px' }}> {/* Add margins */}
        <Home />
      </div>

      {/* Right Sidebar */}
      {!isMobile && (
        <div style={{ ...sidebarStyle, right: 0 }}> {/* Add right: 0 */}
          <span></span>
          <span></span>
          <span></span>
          <a href="/home" style={iconStyle}><FaHome /></a>
          <a href="/experiences" style={iconStyle}><FaUser /></a>
          <a href="/projects" style={iconStyle}><FaProjectDiagram /></a>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
