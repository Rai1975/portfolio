import React from 'react';
import Home from '../components/Info';
import About from '../components/About';

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
