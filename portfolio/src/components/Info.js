import React, { useEffect, useState } from 'react';

const Home = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect initial screen size

  // Define the text and links in an array of objects
  const contentChunks = [
    { type: 'text', value: 'Raihan Rafeek\nComputer Science\nUniversity of Cincinnati\n\n' },
    { type: 'link', value: '/about', label: '> About Me' },
    { type: 'link', value: '/projects', label: '> Projects' },
    { type: 'link', value: '/experiences', label: '> Experience' },
    { type: 'text', value: '\n\n>>> Contact Me! <<<\n' },
    { type: 'link', value: 'https://github.com/rai1975', label: '> GitHub' },
    { type: 'link', value: 'https://linkedin.com/in/raihan-rafeek', label: '> LinkedIn' },
    { type: 'link', value: 'mailto:rafeekrn@mail.uc.edu', label: '> Email [rafeekrn@mail.uc.edu]' },
  ];

  const typingSpeed = 70; // Speed of typing in milliseconds

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
        padding: '0px',
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
        dangerouslySetInnerHTML={{
          __html: text + (done && isMobile ? '\n\n>>> Scroll to know more about me <<<\n' : ''),
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

export default Home;
