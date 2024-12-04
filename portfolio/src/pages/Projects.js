import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [text, setText] = useState(''); // Typing effect text
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false); // Typing effect done state
  const [projects, setProjects] = useState([]); // All projects
  const [categorizedProjects, setCategorizedProjects] = useState({
    'AI/ML': [],
    'General': [],
    'Web Development': [],
  }); // Categorized projects state

  const fullText = `Projects`; // Typing effect text
  const typingSpeed = 50; // Speed of typing in milliseconds

  const categories = ['AI/ML', 'General', 'Web Development'];

  // Typing effect function
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

  // Fetch and categorize projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        console.log("Projects Response: ", data);

        // Categorize projects
        const categorized = {
          'AI/ML': [],
          'General': [],
          'Web Development': [],
        };

        data.forEach(project => {
          if (categorized[project.category]) {
            categorized[project.category].push(project);
          }
        });

        console.log("Categorized projects: ", categorized);

        // Update state
        setProjects(data);
        setCategorizedProjects(categorized); // Update the categorized projects state
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
            {/* Navigation Links for Categories */}
            <div style={{ marginBottom: '20px' }}>
              {categories.map((category, index) => (
                <span key={index}>
                  <a
                    href={`#${category}`}
                    style={{
                      color: '#00ff00',
                      textDecoration: 'none',
                      fontSize: '30px',
                      marginRight: '20px',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#bbb')}
                    onMouseLeave={(e) => (e.target.style.color = '#00ff00')}
                  >
                    {category}
                  </a>
                  {index < categories.length - 1 && (
                    <span style={{ marginRight: '20px', color: '#00ff00' }}>|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Render Projects by Category */}
            {categories.map((category) => (
              <section
                id={category}
                key={category}
                style={{ marginBottom: '50px' }}
              >
                <h2
                  style={{
                    color: '#00ff00',
                    fontSize: '40px',
                    borderBottom: '2px solid #00ff00',
                    marginBottom: '20px',
                  }}
                >
                  {category}
                </h2>

                {categorizedProjects[category] && categorizedProjects[category].length > 0 ? (
                  categorizedProjects[category].map((proj, index) => (
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
                          fontSize: '45px',
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
                            maxWidth: '800px',
                            maxHeight: '500px',
                            borderRadius: '10px',
                          }}
                        />
                      </div>
                      <p style={{ color: '#00ff00', margin: '0 0', fontSize: '30px' }}>{proj.stack}</p>
                      <p style={{ marginTop: '10px', fontSize: '25px' }}>{proj.description}</p>

                      {/* Add separator */}
                      {index < categorizedProjects[category].length - 1 && (
                        <hr
                          style={{
                            border: '0',
                            borderTop: '1px solid #444',
                            margin: '20px 0',
                          }}
                        />
                      )}
                    </article>
                  ))
                ) : (
                  <p style={{ fontSize: '20px', color: '#bbb' }}>No projects in this category</p>
                )}
              </section>
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
