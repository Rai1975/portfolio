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

  const experiences = [
    {
      logo: '/assets/uc.png',
      link: 'https://github.com/KaaustaaubShankar/WhiteBox',
      title: 'python, flask, reactjs, neo4j, llama, openai',
      organization: 'Whitebox',
      date: 'Aug 2024 - Present',
      description: `Worked on a pipeline that effectively... yappage\nmore yappage`,
      screenshot: '/assets/whitebox.png', // Add a screenshot for the project
    },
    {
      logo: '/assets/leopardsat.png',
      link: 'https://uccubecats.github.io/',
      title: 'ADCS Physics Simulation',
      organization: 'LEOPARDSAT-1, University of Cincinnati',
      date: 'Aug 2024 - Present',
      description: `Create simulation software for Passive Attitude Determination and Control Systems (ADCS) for CubeSats, utilizing Pandas, NumPy, and SciPy for data analysis.`,
      screenshot: '/assets/project2.jpg',
    },
    {
      logo: '/assets/inl.png',
      link: 'https://inl.gov/',
      title: 'Full Stack Software Engineer Intern',
      organization: 'Materials and Fuels Complex, Idaho National Laboratory',
      date: 'May 2024 - Aug 2024',
      description: `Contributed to the development of safety-critical software for nuclear inventory management using Ruby on Rails and PostgreSQL.`,
      screenshot: '/assets/project3.jpg',
    },
    {
      logo: '/assets/inl.png',
      link: 'https://inl.gov/',
      title: 'Full Stack Software Engineer Intern',
      organization: 'Materials and Fuels Complex, Idaho National Laboratory',
      date: 'Aug 2023 - Dec 2023',
      description: `Worked on improving search result filtering speed by optimizing queries and implementing caching for nuclear inventory software.`,
      screenshot: '/assets/project4.jpg',
    },
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
            {/* Loop through experiences and display each one */}
            {experiences.map((exp, index) => (
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
