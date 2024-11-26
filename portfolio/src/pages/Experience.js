import React, { useEffect, useState } from 'react';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

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

  const experiences = [
    {
      logo: '/assets/uc.png',
      link: 'https://eecs.ceas.uc.edu/~wilseypa/',
      title: 'Undergraduate Research Assistant',
      organization: 'Experimental Computation Lab, University of Cincinnati',
      date: 'Aug 2024 - Present',
      description: `\tDevelop and optimize algorithms to efficiently analyze and extract meaningful features from high-dimensional datasets using
        Topological Data Analysis (TDA) techniques like persistent homology\n
        Investigate and implement dimensionality reduction techniques, such as PCA, t-SNE, and UMAP, to reduce the complexity
        of high-dimensional datasets while preserving critical features for downstream tasks\n
        Enhance computational efficiency by reducing time complexity and memory usage, enabling faster data processing for larger
        datasets\n`,
    },
    {
      logo: '/assets/leopardsat.png',
      link: 'https://uccubecats.github.io/',
      title: 'ADCS Physics Simulation',
      organization: 'LEOPARDSAT-1, University of Cincinnati',
      date: 'Aug 2024 - Present',
      description: `\tCreate simulation software for Passive Attitude Determination and Control Systems (ADCS) for CubeSats (partnering with
        NASA and nanoracks), utilizing Pandas, NumPy, and SciPy for data analysis and calculations\n
        Apply physical models of magnetic materials and hysteresis curves to simulate magnetic torques into the CubeSat’s
        detumbling algorithm, improving the efficiency and stability of the attitude control system\n
        Integrate data pre-processing pipeline for synthetic dataset with over 6,000,000 data points to reduce runtime for the
        hysteresis model\n
        Collaborate with interdisciplinary teams to refine simulation models and ensure alignment with mission objectives`
    },
    {
      logo: '/assets/inl.png',
      link: 'https://inl.gov/',
      title: 'Full Stack Software Engineer Intern',
      organization: 'Materials and Fuels Complex, Idaho National Laboratory',
      date: 'May 2024 - Aug 2024',
      description: `\tContributed to the development of safety-critical software for nuclear inventory management using Ruby on Rails and
      PostgreSQL, ensuring compliance with strict regulatory standards and minimizing risk\n
      Implemented major changes to improve search result filtering speed by optimizing queries through a database migration and
      implementing caching\n
      Resolved 30+ critical bugs, including new features, and UI/UX inconsistencies ensuring smooth and reliable application
      functionality\n
      Collaborated with engineers in an Agile environment, assisting continuous improvement while receiving mentorship from
      experienced professionals
      `
    },
    {
      logo: '/assets/inl.png',
      link: 'https://inl.gov/',
      title: 'Full Stack Software Engineer Intern',
      organization: 'Materials and Fuels Complex, Idaho National Laboratory',
      date: 'Aug 2023 - Dec 2023',
      description: `\tContributed to the development of safety-critical software for nuclear inventory management using Ruby on Rails and
      PostgreSQL, ensuring compliance with strict regulatory standards and minimizing risk\n
      Implemented major changes to improve search result filtering speed by optimizing queries through a database migration and
      implementing caching\n
      Resolved 30+ critical bugs, including new features, and UI/UX inconsistencies ensuring smooth and reliable application
      functionality\n
      Collaborated with engineers in an Agile environment, assisting continuous improvement while receiving mentorship from
      experienced professionals
      `
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
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: '20px',
        boxSizing: 'border-box',
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
          <div style={{ marginTop: '20px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: '#00ff00',
                textAlign: 'left',
                fontSize: '16px',
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: '10px', borderBottom: '2px solid #00ff00' }}></th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #00ff00' }}>Title</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #00ff00' }}>Organization</th>
                  <th style={{ padding: '10px', borderBottom: '2px solid #00ff00' }}>Date</th>
                </tr>
              </thead>
              <tbody>
              {experiences.map((exp, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr>
                    <td style={{ padding: '10px', borderBottom: '1px solid #00ff00' }}>
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={exp.logo}
                          alt={`${exp.title} logo`}
                          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                        />
                      </a>
                    </td>
                    <td
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #00ff00',
                        cursor: 'pointer',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      onClick={() => toggleDescription(index)}
                    >
                      {exp.title}
                    </td>
                    <td
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #00ff00',
                        fontSize: '18px',
                      }}
                    >
                      {exp.organization}
                    </td>
                    <td
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #00ff00',
                        fontSize: '18px',
                      }}
                    >
                      {exp.date}
                    </td>
                  </tr>
                  {/* Expandable Description Row */}
                  {expandedIndex === index && (
                    <tr>
                      <td colSpan="4" style={{ padding: '10px', backgroundColor: '#2e2e2e' }}>
                        <div
                          style={{
                            animation: 'slideDown 0.3s ease-in-out',
                            color: '#00ff00',
                            fontSize: '18px',
                            lineHeight: '1.5',
                          }}
                        >
                          {exp.description}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>

            </table>
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
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Experience;
