import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const fullText = `Raihan Rafeek\nComputer Science\nUniversity of Cincinnati\n`;

  const typingSpeed = 25; // Speed of typing in milliseconds

  useEffect(() => {
    // Typing animation function
    const type = () => {
      if (currentIndex < fullText.length) {
        setText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setDone(true); // Typing complete
      }
    };

    if (!done) {
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout); // Cleanup timeout on unmount or re-run
    }
  }, [currentIndex, done, fullText]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#2e2e2e',
          borderRadius: '10px 10px 0 0',
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
      </div>

      {/* Terminal Content */}
      <div
        style={{
          width: '100%',
          flexGrow: 1,
          backgroundColor: '#1e1e1e',
          borderRadius: '0 0 10px 10px',
          padding: '15px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          color: '#00ff00', // Green text
          fontSize: '32px',
        }}
      >
        {text}
        {done && (
          <>
            <br />
            <Link
              to="/about"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              &gt; About Me
            </Link>
            <br />
            <Link
              to="/projects"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              &gt; Projects
            </Link>
            <br />
            <Link
              to="/photography"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
                &gt; Photography
            </Link>
            <br />
            <Link
            to="/experience"
            style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
                &gt; Experience
            </Link>
          </>
        )}
        {!done && (
          <span
            style={{
              backgroundColor: '#00ff00',
              color: '#1e1e1e',
              padding: '0 2px',
              display: 'inline-block',
            }}
          >
            |
          </span>
        )}
      </div>

      {/* Keyframes for the blinking cursor */}
      <style>
        {`
          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
