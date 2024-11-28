import React, { useEffect, useState } from 'react';

const Experience = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const fullText = `Experience`;
  const typingSpeed = 50; // Speed of typing in milliseconds

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

  // Fetch experiences data from the JSON file
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/data/experiences.json');
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
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
          color: '#00ff00',
          fontSize: '55px',
        }}
      >
        {text}
        {done && (
          <div style={{ marginTop: '20px' }}>
            {experiences.map((exp, index) => (
              <article
                key={index}
                style={{
                  marginBottom: '30px',
                  color: '#ddd',
                  lineHeight: '1.6',
                }}
              >
                <a
                  href={exp.link}
                  style={{
                    color: '#00ff00',
                    textDecoration: 'none',
                    fontSize: '80px',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#bbb')}
                  onMouseLeave={(e) => (e.target.style.color = '#00ff00')}
                >
                  {exp.title}
                </a>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginBottom: '20px',
                  }}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.title} logo`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '600px',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <p style={{ color: '#00ff00', margin: '0 0', fontSize: '30px' }}>
                  {exp.organization}
                </p>
                <p style={{ color: '#00ff00', margin: '0 0', fontSize: '30px' }}>
                  {exp.date}
                </p>
                <p style={{ marginTop: '10px', fontSize: '25px' }}>{exp.description}</p>

                {/* Add separator */}
                {index < experiences.length - 1 && (
                  <hr
                    style={{
                      border: '0',
                      borderTop: '1px solid #444',
                      margin: '20px 0',
                    }}
                  />
                )}
              </article>
            ))}
          </div>
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

      {/* Keyframes for Animations */}
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
