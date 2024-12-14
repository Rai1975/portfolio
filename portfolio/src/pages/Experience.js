import React, { useEffect, useState } from 'react';

const Experience = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const fullText = `Experience`;
  const typingSpeed = 50; // Speed of typing in milliseconds

  // Typing animation
  useEffect(() => {
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
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, done, fullText]);

  // Fetch experiences from the JSON file
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
      {/* Typing Header */}
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
          <div style={{ marginTop: '20px', width: '100%' }}>
            {experiences.map((exp, index) => (
              <article
                key={index}
                style={{
                  marginBottom: '30px',
                  color: '#ddd',
                  lineHeight: '1.6',
                }}
              >
                <h2
                  style={{
                    fontSize: '40px',
                    color: '#00ff00',
                    marginBottom: '15px',
                    borderBottom: '2px solid #00ff00',
                    paddingBottom: '5px',
                  }}
                >
                  <a
                    href={exp.link}
                    style={{
                      textDecoration: 'none',
                      color: '#00ff00',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#bbb')}
                    onMouseLeave={(e) => (e.target.style.color = '#00ff00')}
                  >
                    {exp.title}
                  </a>
                </h2>
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
                      width: 'auto',
                      height: '300px',
                      maxWidth: '400px',
                      borderRadius: '10px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: '25px',
                    margin: '5px 0',
                    color: '#00ff00',
                  }}
                >
                  {exp.organization}
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    margin: '5px 0',
                    color: '#aaa',
                  }}
                >
                  {exp.date}
                </p>
                <p
                  style={{
                    fontSize: '22px',
                    marginTop: '10px',
                    color: '#ddd',
                  }}
                >
                  {exp.description}
                </p>

              </article>
            ))}
          </div>
        )}

        {/* Blinking Cursor */}
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
          &nbsp;
          </span>
        )}
      </div>
    </div>
  );
};

export default Experience;
