import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Define the text and links in an array of objects
  const contentChunks = [
    { type: 'text', value: `Hello!\nMy name is Raihan Rafeek, I am a third year computer science major at the University of Cincinnati.
  \nI am interested in data science, machine learning, and artificial intelligence. I enjoy building things and prefer to learn new things by making.
  \nOutside the software realm, I also love climbing, motorsports, photography, and music!\n`},
  ];

  const typingSpeed = 60; // Speed of typing in milliseconds

  useEffect(() => {
    // Typing animation function
    const type = () => {
      if (currentIndex < contentChunks.length) {
        const currentChunk = contentChunks[currentIndex];
        setText((prev) => prev + (currentChunk.type === 'text' ? currentChunk.value : ''));

        // Check if the current chunk is a link and add it after typing the text part
        if (currentChunk.type === 'link') {
          setText((prev) => prev + `<a href="${currentChunk.value}" rel="noopener noreferrer" style="color: #00ff00; text-decoration: none;">${currentChunk.label}</a>\n`);
        }

        setCurrentIndex((prev) => prev + 1);
      } else {
        setDone(true); // Typing complete
      }
    };

    if (!done) {
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout); // Cleanup timeout on unmount or re-run
    }
  }, [currentIndex, done, contentChunks]);

  useEffect(() => {
    // Dynamically update the `isMobile` state when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup event listener
  }, []);

  // Array of image paths (ADD REST)
  const personalImagePaths = [
    'assets/me.jpg',
    'assets/me2.jpg',
    'assets/me3.jpg',
    'assets/me4.jpg'
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isLandingPage ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: isLandingPage ? '100vh' : 'calc(100vh - 100px)', // Reduced height
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: isLandingPage ? '0px' : '10px', // Reduced padding
        boxSizing: 'border-box',
        gap: isLandingPage ? '0' : '30px', // Reduced gap
      }}
    >
        {!isLandingPage && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px',
              width: '100%',
              maxWidth: '200px',
              margin: '0',
            }}
          >
            {personalImagePaths.map((imagePath, index) => (
              <div
                key={index}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 0 20px #00ff00', // Neon green glow
                  flexShrink: 0,
                }}
              >
                <img
                  src={imagePath}
                  alt={`Raihan Rafeek ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        )}

      {/* Terminal Content */}
      <div
        style={{
          width: isLandingPage ? '100%' : 'auto',
          flexGrow: isLandingPage ? 1 : 0,
          backgroundColor: '#1e1e1e',
          borderRadius: isLandingPage ? '0 0 10px 10px' : '10px',
          padding: '15px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          color: '#00ff00', // Green text
          fontSize: isLandingPage ? '32px' : '22px', // Slightly smaller font
          textAlign: isLandingPage ? 'left' : 'center',
          maxWidth: isLandingPage ? 'none' : '600px',
        }}
        dangerouslySetInnerHTML={{
          __html: text + (done && isMobile && isLandingPage ? '\n\n>>> Scroll to know more about me <<<\n' : ''),
        }}
      />

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

export default About;