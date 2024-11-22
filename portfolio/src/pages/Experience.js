import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Experience = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const fullText = `Experiences`;

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
          fontSize: '20px',
        }}
      >
        {text}
        {done && (
          <>
            <br />
            <Link
              to="https://eecs.ceas.uc.edu/~wilseypa/"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              &gt; Undergraduate Research Assistant - Experimental Computation Lab - University of Cincinnati
            </Link>
            <br />
            <Link
              to="https://uccubecats.github.io/"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              &gt; ADCS Physics Simulation - LEOPARDSAT-1 - University of Cincinnati
            </Link>
            <br />
            <Link
              to="https://inl.gov/"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
              &gt; Full Stack Software Engineer Intern - Materials and Fuels Complex - Idaho National Laboratory
            </Link>
            <br />
            <Link
            to=""
            style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
                &gt; Idk
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
              animation: 'blink 1s step-start infinite',
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

export default Experience;
