import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const typingSpeed = 10;
  const fullText = 'raihan@uc:~$ cat projects.txt';
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

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpandedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openProject = (project) => {
    setExpandedProject(project);
  };

  const closeModal = () => {
    setExpandedProject(null);
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'Consolas, monospace', position: 'relative' }}>
      <div style={{ color: '#00ff00', fontSize: isMobile ? '20px' : '35px', marginBottom: '20px', fontFamily: 'Courier New, monospace', padding: '15px', whiteSpace: 'pre-wrap' }}>
        {text}
      </div>

      {/* Projects Grid */}
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
              backgroundColor: '#222',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '95%', // Make all cards equal height
            }}
            onClick={() => openProject(proj)}
          >
            <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>
              {proj.title}
            </h3>
            <div style={{
              width: '100%',
              height: isMobile ? '200px' : '250px',
              overflow: 'hidden',
              borderRadius: '10px',
              backgroundColor: '#333',
            }}>
              <img
                src={proj.screenshot}
                alt={`${proj.title} screenshot`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // This crops/scales the image to fill the container
                  borderRadius: '10px',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal (Centered with Escape Key Support) */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 100,
            }}
            onClick={closeModal} // Clicking outside closes modal
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '10px',
                width: isMobile ? '90%' : '50%',
                maxHeight: '80vh',
                overflowY: 'auto',
                zIndex: 200,
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
            >
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                ✖
              </button>

              <h2 style={{ color: '#00ff00', textAlign: 'center', marginBottom: '10px' }}>
                {expandedProject.title}
              </h2>

              <img
                src={expandedProject.screenshot}
                alt={`${expandedProject.title} screenshot`}
                style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '10px' }}
              />

              <p style={{ color: '#00ff00' }}>{expandedProject.stack}</p>
              <p style={{
                fontSize: isMobile ? '15px' : '18px',
                marginTop: '10px',
                color: 'white',
                whiteSpace: 'pre-line'
              }}>
                {expandedProject.description}
              </p>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a
                  href={expandedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    backgroundColor: '#27c93f',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'inline-block',
                  }}
                >
                  {expandedProject.title === 'Rent Radar' ? 'View Website' : expandedProject.title === 'Hand-made Custom Watch' ? 'View Movement' :  'View on Github'}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
