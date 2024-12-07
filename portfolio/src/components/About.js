import React, { useEffect, useState } from 'react';

const About = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Replace ASCII art with image URLs
  const gitHubImage = '/assets/githubAscii.png';
  const linkedInImage = '/assets/linkedinAscii.png';
  const emailImage = '/assets/emailAscii.png';

  // Define the content chunks with type and value
  const contentChunks = [
    { type: 'link', value: 'https://github.com/rai1975', label: `<img src="${gitHubImage}" alt="GitHub" style="width: 80px; height: 80px;"/>`, small: true },
    { type: 'link', value: 'https://linkedin.com/in/raihan-rafeek', label: `<img src="${linkedInImage}" alt="LinkedIn" style="width: 80px; height: 80px;"/>`, small: true },
    { type: 'link', value: 'mailto:rafeekrn@mail.uc.edu', label: `<img src="${emailImage}" alt="Email" style="width: 80px; height: 80px;"/>`, small: true },
    { type: 'link', value: '/about', label: '\n> About Me\n', small: false },
    { type: 'link', value: '/projects', label: '> Projects\n', small: false },
    { type: 'link', value: '/experiences', label: '> Experience\n', small: false },
  ];

  const typingSpeed = 80; // Speed of typing in milliseconds

  useEffect(() => {
    // Typing animation function
    const type = () => {
      if (currentIndex < contentChunks.length) {
        const chunk = contentChunks[currentIndex];
        let chunkText = '';

        // Check for specific links and apply smaller font size for images
        if (chunk.type === 'text') {
          chunkText = chunk.value;
        } else if (chunk.type === 'link') {
          let label = chunk.label;

          // Apply smaller font size for the ASCII art links (now images)
          if (chunk.small === true) {
            label = `<span style="font-size: 30px;">${label}</span>`;
          } else {
            label = `<a href="${chunk.value}" style="color: #00ff00; text-decoration: none;">${label}</a>`;
          }

          chunkText = label;
        }

        setText((prev) => prev + chunkText); // Append the text or link
        setCurrentIndex((prev) => prev + 1); // Move to the next chunk
      } else {
        setDone(true); // Typing complete
      }
    };

    if (!done) {
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout); // Cleanup timeout on unmount or re-run
    }
  }, [currentIndex, done]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Stack image and text vertically
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh', // Ensure the container takes full screen height
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Consolas, monospace',
        padding: '15px',
        boxSizing: 'border-box',
        overflow: 'hidden', // Prevent any extra scrolling or white space
      }}
    >
      {/* Scalable Image with 8-bit effect */}
      <img
        src="/assets/me.jpg"
        alt="8-bit image"
        style={{
          filter: 'contrast(200%) saturate(200%) brightness(150%) grayscale(100%) pixelate(50%)',
          imageRendering: 'pixelated',
          width: '80%', // Make image take up 80% of available width
          maxWidth: '500px', // Optional: Limit maximum size for large screens
          marginBottom: '20px', // Adjust gap between image and text
          height: 'auto', // Maintain aspect ratio
        }}
      />

      <div
        style={{
          fontSize: '32px',
          whiteSpace: 'pre-wrap',
          textAlign: 'center', // Center the text
          flexGrow: 1, // Ensures this part expands to fill the available vertical space
          wordBreak: 'break-word', // Prevents long words from overflowing
        }}
        dangerouslySetInnerHTML={{ __html: text }} // Safely insert HTML (for the links)
      />

      {/* Display blinking cursor when done */}
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
