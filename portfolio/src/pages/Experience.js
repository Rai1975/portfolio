import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";

const Experience = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

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

  // Handle responsive design - improved detection
  useEffect(() => {
    // More reliable mobile detection - check on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check immediately on mount
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch experiences from the JSON file and sort by start date
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/data/experiences.json');
        const data = await response.json();

        // Sort experiences by start date (newest first)
        const sortedData = [...data].sort((a, b) => {
          const dateA = new Date(a.startDate || a.date.split(' - ')[0]);
          const dateB = new Date(b.startDate || b.date.split(' - ')[0]);
          return dateB - dateA;
        });

        setExperiences(sortedData);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);

  // Handle next and previous
  const handleNext = () => {
    if (activeExperience < experiences.length - 1) {
      setActiveExperience(activeExperience + 1);
    }
  };

  const handlePrev = () => {
    if (activeExperience > 0) {
      setActiveExperience(activeExperience - 1);
    }
  };

  // Navigate to specific experience from timeline
  const navigateToExperience = (index) => {
    setActiveExperience(index);
  };

  // Format description text to preserve line breaks
  const formatDescription = (description) => {
    if (!description) return [];
    return description.split('\n').map((paragraph, i) => (
      <p key={i} style={{
        lineHeight: '1.6',
        marginBottom: '12px',
        textAlign: 'justify',
        fontSize: isMobile ? '13px' : '16px'
      }}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: isMobile ? '5px' : '20px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* Typing Header */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#1e1e1e',
          borderRadius: '0 0 10px 10px',
          padding: isMobile ? '10px' : '15px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          color: '#00ff00',
          fontSize: isMobile ? '32px' : '55px',
          marginBottom: isMobile ? '10px' : '20px',
          textAlign: 'left',
        }}
      >
        {text}
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

      {/* Navigation Buttons */}
      {done && experiences.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
            marginBottom: isMobile ? '10px' : '20px',
          }}
        >
          <button
            onClick={handlePrev}
            disabled={activeExperience === 0}
            style={{
              backgroundColor: activeExperience === 0 ? '#333' : '#282828',
              color: activeExperience === 0 ? '#555' : '#00ff00',
              border: 'none',
              padding: isMobile ? '8px 12px' : '10px 20px',
              borderRadius: '5px',
              cursor: activeExperience === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'Consolas, monospace',
              fontSize: isMobile ? '12px' : '16px',
              transition: '0.3s',
              zIndex: 10,
              touchAction: 'manipulation',
            }}
          >
            &lt; Previous
          </button>
          <span
            style={{
              color: '#00ff00',
              fontSize: isMobile ? '12px' : '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {activeExperience + 1} of {experiences.length}
          </span>
          <button
            onClick={handleNext}
            disabled={activeExperience === experiences.length - 1}
            style={{
              backgroundColor: activeExperience === experiences.length - 1 ? '#333' : '#282828',
              color: activeExperience === experiences.length - 1 ? '#555' : '#00ff00',
              border: 'none',
              padding: isMobile ? '8px 12px' : '10px 20px',
              borderRadius: '5px',
              cursor: activeExperience === experiences.length - 1 ? 'not-allowed' : 'pointer',
              fontFamily: 'Consolas, monospace',
              fontSize: isMobile ? '12px' : '16px',
              transition: '0.3s',
              zIndex: 10,
              touchAction: 'manipulation',
            }}
          >
            Next &gt;
          </button>
        </div>
      )}

      {/* Experience Carousel with Previews - Simplified for mobile */}
      {done && experiences.length > 0 && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            height: isMobile ? '320px' : '450px',
            marginTop: isMobile ? '35px' : '30px',
            marginBottom: isMobile ? '45px' : '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Main Experience Cards Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Experience Cards */}
            {experiences.map((exp, index) => {
              // Calculate position relative to active card
              let position = index - activeExperience;

              // Simplified mobile view - only show active card
              let cardStyle = {
                position: 'absolute',
                width: isMobile ? '95%' : '65%',
                height: isMobile ? 'auto' : '100%',
                opacity: isMobile ? (position === 0 ? 1 : 0) : (Math.abs(position) > 1 ? 0 : 1),
                zIndex: position === 0 ? 3 : 1,
                transition: 'all 0.5s ease',
                pointerEvents: position === 0 ? 'auto' : 'none',
              };

              // Positioning logic - simplified for mobile
              if (position === 0) {
                // Active card
                cardStyle.transform = 'translateX(0) scale(1)';
                cardStyle.zIndex = 3;
              } else if (!isMobile && position === 1) {
                // Next card (desktop only)
                cardStyle.transform = 'translateX(60%) scale(0.85)';
                cardStyle.zIndex = 2;
              } else if (!isMobile && position === -1) {
                // Previous card (desktop only)
                cardStyle.transform = 'translateX(-60%) scale(0.85)';
                cardStyle.zIndex = 2;
              } else {
                // Other cards
                cardStyle.transform = position > 0
                  ? 'translateX(150%) scale(0.7)'
                  : 'translateX(-150%) scale(0.7)';
                cardStyle.opacity = 0;
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardStyle.opacity }}
                  style={cardStyle}
                >
                  <div
                    style={{
                      backgroundColor: '#282828',
                      borderRadius: '10px',
                      padding: isMobile ? '15px' : '25px',
                      height: '100%',
                      width: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: position === 0
                        ? '0 4px 15px rgba(0, 255, 0, 0.3)'
                        : '0 4px 15px rgba(0, 0, 0, 0.6)',
                      border: position === 0 ? '2px solid #00ff00' : 'none',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Title and Logo */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: isMobile ? '10px' : '15px',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: isMobile ? '20px' : '30px',
                          color: '#00ff00',
                          margin: '0',
                        }}
                      >
                        {exp.title}
                      </h2>
                      <img
                        src={exp.logo}
                        alt={`${exp.title} logo`}
                        style={{
                          width: isMobile ? '40px' : '70px',
                          height: 'auto',
                          borderRadius: '5px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    {/* Experience Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p
                        style={{
                          fontSize: isMobile ? '14px' : '18px',
                          margin: '5px 0',
                          color: '#00ff00',
                        }}
                      >
                        {exp.organization}
                      </p>
                      <p
                        style={{
                          fontSize: isMobile ? '12px' : '16px',
                          margin: '5px 0',
                          color: '#aaa',
                        }}
                      >
                        {exp.date}
                      </p>
                      <div
                        style={{
                          fontSize: isMobile ? '13px' : '16px',
                          marginTop: isMobile ? '10px' : '15px',
                          color: 'white',
                          flex: '1',
                          overflow: 'auto',
                          maxHeight: isMobile ? '250px' : '270px',
                          padding: '0 2px',
                        }}
                      >
                        {/* Preserve line breaks in description */}
                        {formatDescription(exp.description)}

                        {/* Skills or technologies used (if available in your data) */}
                        {exp.skills && (
                          <div style={{ marginTop: isMobile ? '10px' : '15px' }}>
                            <p style={{ color: '#00ff00', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>Technologies:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {exp.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  style={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#00ff00',
                                    padding: isMobile ? '3px 6px' : '5px 10px',
                                    borderRadius: '4px',
                                    fontSize: isMobile ? '10px' : '14px',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline - Scrollable on mobile */}
      {done && experiences.length > 0 && (
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            marginTop: isMobile ? '5px' : '10px',
            position: 'relative',
            padding: '20px 0',
            overflowX: isMobile ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Timeline Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '3px',
              backgroundColor: '#333',
              transform: 'translateY(-50%)',
              zIndex: 0,
            }}
          />

          {/* Timeline Markers */}
          <div
            style={{
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'space-between',
              position: 'relative',
              zIndex: 1,
              minWidth: isMobile ? 'auto' : 'auto',
              paddingLeft: isMobile ? '10px' : '0',
              paddingRight: isMobile ? '10px' : '0',
            }}
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                onClick={() => navigateToExperience(index)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: isMobile ? '50px' : '60px',
                  marginRight: isMobile ? '0' : '0',
                  touchAction: 'manipulation',
                }}
              >
                <div
                  style={{
                    width: isMobile ? '18px' : '24px',
                    height: isMobile ? '18px' : '24px',
                    borderRadius: '50%',
                    backgroundColor: index === activeExperience ? '#00ff00' : '#555',
                    transition: 'all 0.3s ease',
                    border: '3px solid #1e1e1e',
                    boxShadow: index === activeExperience
                      ? '0 0 10px rgba(0, 255, 0, 0.7)'
                      : 'none',
                  }}
                />
                <p
                  style={{
                    fontSize: isMobile ? '10px' : '12px',
                    marginTop: '5px',
                    color: index === activeExperience ? '#00ff00' : '#aaa',
                    textAlign: 'center',
                    transform: isMobile ? 'rotate(-30deg)' : 'none',
                    transformOrigin: 'center',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {/* Extract just the year from the date */}
                  {exp.date.split(' - ')[0].split(' ').pop()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile swipe indicator */}
      {isMobile && done && experiences.length > 0 && (
        <div style={{
          color: '#aaa',
          fontSize: '12px',
          textAlign: 'center',
          marginTop: '10px',
          padding: '5px',
        }}>
          Swipe timeline or use buttons to navigate
        </div>
      )}
    </div>
  );
};

export default Experience;