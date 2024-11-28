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

  const githubAsciiArt = `
   _____ _ _   _    _       _
  / ____(_) | | |  | |     | |
 | |  __ _| |_| |__| |_   _| |__
 | | |_ | | __|  __  | | | | '_ \\
 | |__| | | |_| |  | | |_| | |_) |
  \\_____|_|\\__|_|  |_|\\__,_|_.__/
`;

  const linkedinAsciiArt = `
  _      _       _            _ _____
 | |    (_)     | |          | |_   _|
 | |     _ _ __ | | _____  __| | | |  _ __
 | |    | | '_ \\| |/ / _ \\/ _' | | | | '_ \\
 | |____| | | | |   <  __/ (_| |_| |_| | | |
 |______|_|_| |_|_|\\_\\___|\\__,_|_____|_| |_|

                                            `;

  const emailAsciiArt = `
  ______                 _ _
 |  ____|               (_) |
 | |__   _ __ ___   __ _ _| |
 |  __| | '_ ' _ \\ / _ | | |
 | |____| | | | | | (_| | | |
 |______|_| |_| |_|\\__,_|_|_|
`;
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
              to="/experiences"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              &gt; Experience
            </Link>
            <br />
            <div style={{ marginTop: '20px', color: '#00ff00', fontSize: '25px' }}>
              <a
                href="https://github.com/rai1975"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#00ff00',
                  textDecoration: 'none',
                  display: 'block',
                  margin: '5px 0',
                }}
              >
                {githubAsciiArt}
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/raihan-rafeek"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#00ff00',
                  textDecoration: 'none',
                  display: 'block',
                  margin: '5px 0',
                }}
              >
                {linkedinAsciiArt}
              </a>
              {/* Email */}
              <a
                href="mailto:rafeekrn@mail.uc.edu"
                style={{
                  color: '#00ff00',
                  textDecoration: 'none',
                  display: 'block',
                  margin: '5px 0',
                }}
              >
                {emailAsciiArt} rafeekrn@mail.uc.edu
              </a>
            </div>
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
