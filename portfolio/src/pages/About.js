import React, { useEffect, useState } from 'react';

const About = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const fullText = `Hello!\nMy name is Raihan Rafeek, I am a third year computer science major at the University of Cincinnati.
  \nI am interested in data science, machine learning and artificial intelligence. I enjoy building things and prefer to learn new things by making.
  \nOutside the software realm, I also love climbing, motorsports, photography and music!`;

  const typingSpeed = 5; // Speed of typing in milliseconds

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
      {/* Terminal Content */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
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
        {/* Image with 8-bit effect */}
        <img
          src="/assets/me.jpg"
          alt="8-bit image"
          style={{
            filter: 'contrast(200%) saturate(200%) brightness(150%) grayscale(100%) pixelate(50%)',
            imageRendering: 'pixelated',
            width: '600px',
            marginRight: '80px', // Space between the image and text
          }}
        />
        <div>
          {text}
          {done && (
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

export default About;
