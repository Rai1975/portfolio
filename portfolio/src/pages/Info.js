import React, { useEffect, useState } from 'react';

const About = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const gitHubImage = '/assets/github-11-xxl.png';
  const linkedInImage = '/assets/white_linkedin.png';
  const emailImage = '/assets/ms-outlook-white.png';

  const contentChunks = [
    { type: 'link', value: '/about', label: '\n> More About Me\n', small: false },
    { type: 'link', value: '/projects', label: '> Projects\n', small: false },
    { type: 'link', value: '/experiences', label: '> Experience\n', small: false },

  ];

  const typingSpeed = 80;

  useEffect(() => {
    const type = () => {
      if (currentIndex < contentChunks.length) {
        const chunk = contentChunks[currentIndex];
        let chunkText = '';

        if (chunk.type === 'text') {
          chunkText = chunk.value;
        } else if (chunk.type === 'link') {
          const label = `<a href="${chunk.value}" style="color: #00ff00; text-decoration: none;">${chunk.label}</a>`;
          chunkText = label;
        }

        setText((prev) => prev + chunkText);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setDone(true);
      }
    };

    if (!done) {
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, done]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Consolas, monospace',
        padding: '15px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Profile Picture with Neon Glow */}
      <img
        src="/assets/me.jpg"
        alt="8-bit profile"
        style={{
          imageRendering: 'pixelated',
          width: '80%',
          maxWidth: '500px',
          marginBottom: '20px',
          height: 'auto',
          boxShadow: '0 0 5px 2px rgba(0, 255, 0, 0.8)', // Neon green glow
        }}
      />

      {/* Clickable Images for Links */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <a href="https://github.com/rai1975" target="_blank" rel="noopener noreferrer">
          <img
            src={gitHubImage}
            alt="GitHub"
            style={{ width: '75px', height: '75px', cursor: 'pointer' }}
          />
        </a>
        <a href="https://linkedin.com/in/raihan-rafeek" target="_blank" rel="noopener noreferrer">
          <img
            src={linkedInImage}
            alt="LinkedIn"
            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
          />
        </a>
        <a href="mailto:rafeekrn@mail.uc.edu" target="_blank" rel="noopener noreferrer">
          <img
            src={emailImage}
            alt="Email"
            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
          />
        </a>
      </div>

      {/* Typing Animation */}
      <div
        style={{
          fontSize: '32px',
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
          flexGrow: 1,
          wordBreak: 'break-word',
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default About;
