import React, { useEffect, useState } from 'react';
import { isMotionValue, motion } from 'motion/react';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const typingSpeed = 50;
  const fullText = 'Projects';
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const type = () => {
      if (currentIndex < fullText.length) {
        setText((prev) => prev + fullText[currentIndex]);
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

  const toggleExpand = (projectTitle) => {
    setExpandedProject((prev) => (prev === projectTitle ? null : projectTitle));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'Consolas, monospace' }}>
      <div style={{ color: '#00ff00', fontSize: isMobile ? '45px' : '55px', marginBottom: '20px', fontFamily: 'Consolas, monospace', padding: '15px', fontWeight: 'lighter'}}>{text}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'repeat(3, minmax(300px, 3fr))',
          gap: '20px',
          alignItems: 'flex-start',
          textAlign: 'left',
        }}
      >
        {projects.map((proj) => (
          <motion.div
            key={proj.title}
            layout
            style={{
              border: '1px solid #444',
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: expandedProject === proj.title ? '#333' : '#222',
              cursor: 'pointer',
            }}
            onClick={() => toggleExpand(proj.title)}
          >
            <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontSize: isMobile ? '20px' : '30px'}}>
                {proj.title}
              </a>
            </h3>
            <img
              src={proj.screenshot}
              alt={`${proj.title} screenshot`}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            {expandedProject === proj.title && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: '10px' }}
              >
                <p style={{ color: '#00ff00' }}>{proj.stack}</p>
                <p style={{
                        fontSize: isMobile ? '15px' : '18px',
                        marginTop: '10px',
                        color: 'white',
                        whiteSpace: 'pre-line'
                      }} >{proj.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
