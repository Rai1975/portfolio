import React, { useEffect, useState } from 'react';
import Home from './About-me';
import About from './Info';

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    !isMobile ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#1e1e1e',
          height: '100vh',
          boxSizing: 'border-box',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {/* Left Column: Home Component */}
        <div
          style={{
            flex: 1,
            minWidth: '300px',
            marginRight: '0px',
            backgroundColor: '#1e1e1e',
          }}
        >
          <Home />
        </div>

        {/* Right Column: About Component */}
        <div
          style={{
            flex: 1,
            minWidth: '300px',
          }}
        >
          <About />
        </div>
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#1e1e1e',
          height: '100vh',
          boxSizing: 'border-box',
          flexWrap: 'wrap',
          position: 'relative',
        }}
      >
        {/* Right Column: About Component */}
        <div
          style={{
            flex: 1,
            minWidth: '300px',
          }}
        >
          <About />
        </div>

        {/* Left Column: Home Component */}
        <div
          style={{
            flex: 1,
            minWidth: '300px',
            marginRight: '0px',
            backgroundColor: '#1e1e1e',
          }}
        >
          <Home />
        </div>
      </div>
    )
  );
};

export default LandingPage;
