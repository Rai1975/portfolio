import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const fullText = `Projects`;

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

  const projects = [
    {
      logo: '/assets/uc.png',
      link: 'https://github.com/KaaustaaubShankar/WhiteBox',
      title: 'python, flask, reactjs, neo4j, llama, langchain, huggingface, openai',
      organization: 'Whitebox',
      date: 'Aug 2024 - Present',
      description: `Worked on a pipeline that effectively... yappage\nmore yappage`,
      screenshot: '/assets/whitebox.png',
    },
    {
      logo: '/assets/leopardsat.png',
      link: 'https://github.com/KaaustaaubShankar/Memento',
      title: 'python, flask, reactjs, postgres, openai',
      organization: 'Memento',
      date: 'Feb 2024 - Mar 2024',
      description: `RAG pipeline.. rah`,
      screenshot: '/assets/memento.jpg',
    },
    {
      logo: '/assets/inl.png',
      link: 'https://github.com/Aryagarg23/Terminally-Addicted',
      title: 'python, go, curses',
      organization: 'Terminally-Addicted',
      date: 'May 2024 - Aug 2024',
      description: `only the coolest terminal ever`,
      screenshot: '/assets/terminal.svg',
    },
    {
      logo: '/assets/inl.png',
      link: 'https://github.com/Rai1975/SASEHackProject',
      title: 'python, bert, openai, huggingface, nextjs, neo4j',
      organization: 'Hi-Five',
      date: 'Aug 2024',
      description: `Big cool anon friend mathcing vector based app!`,
      screenshot: '/assets/hi-five.webp',
    },
    {
      logo: '/assets/inl.png',
      link: 'https://github.com/Rai1975/Canvas2DoIst',
      title: 'python, rest api',
      organization: 'Canvas2DoIst',
      date: 'Aug 2024',
      description: 'Script that automates filling in todoist with canvas api',
      screenshot: '/assets/todoist.webp'
    },
    {
      logo:'assets/inl.png',
      link: 'https://github.com/Rai1975/NeuralNetwork',
      title: 'python, transformers, numpy, pytorch, tensorflow',
      organization: 'Neural Networks',
      date: 'Oct 2024 - Present',
      description: 'Repository of self-learning tools to understand neural networks, including a transformer network from scratch',
      screenshot: '/assets/home_page_2.jpg'
    }
  ];

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expansion
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh', // Allow the container to grow with content
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto', // Enable scrolling
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
          <div style={{ marginTop: '20px', width: '100%', display: 'grid', gap: '20px' }}>
            {/* Loop through projects and display each one */}
            {projects.map((exp, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#2e2e2e',
                  borderRadius: '10px',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  animation: `cascade 0.6s ease-in-out ${index * 0.2}s`, // Apply cascade animation with staggered delay
                }}
                onClick={() => toggleDescription(index)}
              >
                {/* Project Tile with Screenshot */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <img
                    src={exp.screenshot}
                    alt={`${exp.title} screenshot`}
                    style={{
                      width: '200px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <div style={{ flex: 1, marginLeft: '15px' }}>
                    <h2 style={{ color: '#00ff00', fontSize: '24px', margin: 0 }}>
                      {exp.title}
                    </h2>
                    <a
                      href={exp.link}
                      style={{
                        color: '#bbb',
                        marginTop: '5px',
                        textDecoration: 'none', // Remove the underline
                        transition: 'color 0.3s ease', // Add transition for color change on hover
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#00ff00')} // Hover color change
                      onMouseLeave={(e) => (e.target.style.color = '#bbb')} // Revert to original color when not hovering
                    >
                      {exp.organization}
                    </a>
                    <p style={{ color: '#bbb', marginTop: '5px' }}>{exp.date}</p>
                    {expandedIndex === index && (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            padding: '10px',
                            backgroundColor: '#2e2e2e',
                            animation: 'slideToggle 0.3s ease-in-out', // Apply animation here
                          }}
                        >
                          <div style={{ color: '#00ff00', fontSize: '16px' }}>
                            {exp.description}
                          </div>
                        </td>
                      </tr>
                    )}
                  </div>
                </div>
              </div>
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
           @keyframes slideToggle {
            0% {
              opacity: 0;
              max-height: 0;
              padding-top: 0;
              padding-bottom: 0;
            }
            100% {
              opacity: 1;
              max-height: 1000px; /* Adjust based on the expected height of the description */
              padding-top: 10px;
              padding-bottom: 10px;
            }
          }

          @keyframes cascade {
            0% {
              opacity: 0;
              transform: translateY(20px); /* Start below the normal position */
            }
            100% {
              opacity: 1;
              transform: translateY(0); /* End at the normal position */
            }
          }

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

export default Projects;
