import React, { useEffect, useState } from 'react';
import { motion } from "motion/react"

const Experience = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Tracks the expanded item
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fullText = `Experience`;
  const typingSpeed = 50;

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
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
          fontSize: isMobile ? '45px' : '55px',
        }}
      >
        {text}
        {done && (
          <div style={{ marginTop: '20px', width: '100%' }}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{
                  backgroundColor: '#282828',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: '0.3s',
                  boxShadow: expandedIndex === index ? '0 4px 15px rgba(0, 0, 0, 0.6)' : '0 2px 8px rgba(0, 0, 0, 0.4)',
                }}
                onClick={() => toggleExpand(index)}
              >
                {/* Title and Logo */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h2
                    style={{
                      fontSize: isMobile ? '20px' : '30px',
                      color: '#00ff00',
                      marginBottom: '0',
                    }}
                  >
                    {exp.title}
                  </h2>
                  <img
                    src={exp.logo}
                    alt={`${exp.title} logo`}
                    style={{
                      width: isMobile ? '50px' : '75px',
                      height: 'auto',
                      borderRadius: '5px',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Expanded Details */}
                {expandedIndex === index && (
                   <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: expandedIndex === index ? 1 : 0,
                        height: expandedIndex === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                    <p
                      style={{
                        fontSize: isMobile ? '15px' : '20px',
                        margin: '5px 0',
                        color: '#00ff00',
                      }}
                    >
                      {exp.organization}
                    </p>
                    <p
                      style={{
                        fontSize: isMobile ? '15px' : '18px',
                        margin: '5px 0',
                        color: '#aaa',
                      }}
                    >
                      {exp.date}
                    </p>
                    <p
                      style={{
                        fontSize: isMobile ? '15px' : '18px',
                        marginTop: '10px',
                        color: 'white'
                      }}
                    >
                      {exp.description}
                    </p>
                    </motion.div>
                )}
                </motion.div>
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
