import React, { useEffect, useState } from 'react';

const TerminalExperience = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fullText = 'raihan@uc:~$ cat experience.txt';
  const typingSpeed = 10;

    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const response = await fetch('/data/experiences.json');
      const data = await response.json();
      setExperiences(data);
    };
    fetchExperiences();
  }, []);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown' && activeIndex < experiences.length - 1) {
      setActiveIndex(i => i + 1);
    } else if (e.key === 'ArrowUp' && activeIndex > 0) {
      setActiveIndex(i => i - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, experiences.length]);

  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Courier New, monospace',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div style={{ fontSize: isMobile ? '25px' : '35px', marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
        {text}
        {!done && <span className="blinker">|</span>}
      </div>

      {done && experiences.map((exp, index) => (
        <div style={{
          fontFamily: 'Consolas, monospace',
          color: '#00ff00',
          marginBottom: '40px'
        }}>
          <div style={{
            borderBottom: '2px solid #00ff00',
            paddingBottom: '5px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>
              ➤ #{index + 1}: {exp.title} @ {exp.organization} ({exp.date})
            </span>
            <img src={exp.logo} alt={`${exp.title} logo`} style={{ height: '40px', objectFit: 'contain' }} />
          </div>

          <pre style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: isMobile ? '13px' : '16px' }}>
        ▸ <b>Title</b>: {exp.title}
        <br></br>
        ▸ <b>Organization</b>: {exp.organization}
        <br></br>
        ▸ <b>Duration</b>: {exp.date}
        <br></br>
        <br></br>
        ▸ <b>Description</b>:
        {exp.description}

        {exp.skills?.length > 0 && (
          <>
        ▸ <b>Technologies</b> : {exp.skills.join(', ')}
          </>
        )}
          </pre>

          <div style={{
            marginTop: '30px',
            borderTop: '1px dashed #00ff00',
            opacity: 0.3,
          }} />
        </div>

      ))}

      {done && (
        <div style={{ color: '#888', fontSize: '12px', marginTop: '20px' }}>
          Use ↑ and ↓ to navigate experiences
        </div>
      )}

      <style>{`
        .blinker {
          display: inline-block;
          width: 10px;
          background-color: #00ff00;
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TerminalExperience;