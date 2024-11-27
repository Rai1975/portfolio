import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [projects, setProjects] = useState([]);

  const fullText = `Projects`;
  const typingSpeed = 50; // Speed of typing in milliseconds

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


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
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
            backgroundColor: '#ff5f56',
            marginRight: '8px',
          }}
        ></div>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
            marginRight: '8px',
          }}
        ></div>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#27c93f',
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
          color: '#00ff00',
          fontSize: '55px',
        }}
      >
        {text}
        {done && (
          <div style={{ marginTop: '20px', width: '100%' }}>
            {projects.map((proj, index) => (
              <article
                key={index}
                style={{
                  marginBottom: '30px',
                  color: '#ddd',
                  lineHeight: '1.6',
                }}
              >
                <a
                  href={proj.link}
                  style={{
                    color: '#00ff00',
                    textDecoration: 'none',
                    fontSize: '80px',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#bbb')}
                  onMouseLeave={(e) => (e.target.style.color = '#00ff00')}
                >
                  {proj.title}
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
                    src={proj.screenshot}
                    alt={`${proj.title} screenshot`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '600px',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <p style={{ color: '#00ff00', margin: '0 0', fontSize: '30px' }}>{proj.stack}</p>
                <p style={{ marginTop: '10px', fontSize: '25px' }}>{proj.description}</p>

                {/* Add separator */}
                {index < projects.length - 1 && (
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
    </div>
  );
};

export default Projects;
