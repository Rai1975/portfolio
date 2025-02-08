import React, { useEffect, useState } from 'react';
import { motion } from "motion/react"

const Projects = () => {
  const [text, setText] = useState(''); // Typing effect text
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false); // Typing effect done state
  const [projects, setProjects] = useState([]); // All projects
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [categorizedProjects, setCategorizedProjects] = useState({
    'AI/ML': [],
    'General': [],
    'Web Development': [],
  }); // Categorized projects state
  const [modalImage, setModalImage] = useState(null); // Modal image state
  const [expandedProject, setExpandedProject] = useState(null); // Track expanded project

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const closeModal = () => setModalImage(null); // Close the modal

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalImage]);

  const toggleExpand = (projectTitle) => {
    setExpandedProject((prev) => (prev === projectTitle ? null : projectTitle));
  };

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
          fontSize: isMobile ? '40px' : '55px',
        }}
      >
        {text}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: '20px', width: '100%' }}
          >
            {categories.map((category) => (
              <motion.section
                id={category}
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ marginBottom: '50px' }}
              >
                <h2
                  style={{
                    color: '#00ff00',
                    fontSize: isMobile ? '30px' : '40px',
                    borderBottom: '2px solid #00ff00',
                    marginBottom: '20px',
                  }}
                >
                  {category}
                </h2>

                {categorizedProjects[category] && categorizedProjects[category].length > 0 ? (
                  categorizedProjects[category].map((proj, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{
                        marginBottom: '30px',
                        color: '#ddd',
                        lineHeight: '1.6',
                      }}
                    >
                      <motion.div
                        layout
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          border: '1px solid #444',
                          borderRadius: '10px',
                          padding: '15px',
                          backgroundColor: expandedProject === proj.title ? '#333' : '#222',
                        }}
                        onClick={() => toggleExpand(proj.title)}
                      >
                        <h3
                          style={{
                            fontSize: isMobile ? '20px' : '30px',
                            margin: '0 0 10px',
                            color: '#00ff00',
                          }}
                        >
                          {proj.title}
                        </h3>
                        <img
                          src={proj.screenshot}
                          alt={`${proj.title} screenshot`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '800px',
                            maxHeight: '500px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalImage(proj.screenshot);
                          }}
                        />
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: expandedProject === proj.title ? 1 : 0,
                            height: expandedProject === proj.title ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ overflow: "hidden", marginTop: '10px' }}
                        >
                          <p style={{ color: '#00ff00', fontSize: isMobile ? '20px' : '30px' }}>{proj.stack}</p>
                          <p style={{ marginTop: '10px', fontSize: isMobile ? '15px' : '18px' }}>{proj.description}</p>
                        </motion.div>
                      </motion.div>
                    </motion.article>
                  ))
                ) : (
                  <p style={{ fontSize: isMobile ? '15px' : '20px', color: '#bbb' }}>No projects in this category</p>
                )}
              </motion.section>
            ))}
          </motion.div>
        )}

        {!done && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundColor: '#00ff00',
              color: '#1e1e1e',
              padding: '0 2px',
              display: 'inline-block',
            }}
          >
            &nbsp;
          </motion.span>
        )}

        {modalImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            onClick={closeModal}
          >
            <img
              src={modalImage}
              alt="Enlarged project"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                borderRadius: '10px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
              }}
            />
          </motion.div>
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
            &nbsp;
          </span>
        )}
      </div>

      {modalImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Enlarged project"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;