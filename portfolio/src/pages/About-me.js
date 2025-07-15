import React, { useEffect, useState } from 'react';

const About = ({ isLandingPage = true }) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCursor, setShowCursor] = useState(true);

  const aboutMe = `> whoami
raihan@uc:~$ Raihan Rafeek
4th year CS student @ University of Cincinnati

> cat bio.txt
Hey there! I'm a curious builder who turns ideas into reality through code.
I live in the intersection of data science, ML, and backend architecture.
My philosophy? Learn by building, break things, then build them better.

> ls interests/
├── technical/
│   ├── machine_learning.py
│   ├── data_science.sql
│   ├── backend_development.js
│   └── database_architecture.md
└── personal/
    ├── rock_climbing.gear
    ├── motorsports.mp4
    ├── photography.raw
    └── music_collection/ (seriously, let's talk music!)

> echo "Thanks for stopping by!"`;

  const altAboutme = `> ./quick_intro.sh
Loading profile...

Hey there! I'm a curious builder who loves turning ideas into reality.
Whether it's diving into machine learning and AI or tinkering with aerospace software,
I'm all about exploring cool, new challenges.

When I'm not geeking out over code, you can probably find me scaling a climbing wall
or playing Minecraft. Life's an adventure, and I'm here to enjoy every bit of it.
I'm also a CLI monkey 🐵

> exit
Thanks for visiting!`;

  const contentChunks = [
    { type: 'text', value: isLandingPage ? aboutMe : altAboutme },
  ];

  const typingSpeed = 1;

  const personalImagePaths = [
    'assets/tetons.webp',
    'assets/teaching.webp',
    'assets/rock.webp',
    'assets/climbing.webp',
  ];

  const profileImage = 'assets/me.webp';

  useEffect(() => {
    const type = () => {
      if (currentIndex < contentChunks.length) {
        const currentChunk = contentChunks[currentIndex];
        const currentText = currentChunk.type === 'text' ? currentChunk.value : '';

        if (text.length < currentText.length) {
          setText((prev) => prev + currentText[text.length]);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      } else {
        setDone(true);
      }
    };

    if (!done) {
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, done, contentChunks]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLandingPage) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#1e1e1e',
          color: 'white',
          fontFamily: 'Consolas, monospace',
          padding: isMobile ? '20px 10px' : '40px 20px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={profileImage}
          alt="Profile"
          style={{
            width: isMobile ? '120px' : '200px',
            height: isMobile ? '120px' : '200px',
            borderRadius: '50%',
            marginBottom: isMobile ? '20px' : '30px',
            boxShadow: '0 0 15px #00ff00',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: isMobile ? '95%' : '1200px',
            backgroundColor: '#2a2a2a',
            borderRadius: isMobile ? '8px' : '12px',
            boxShadow: '0 0 25px rgba(0, 255, 0, 0.4)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: isMobile ? '20px' : '40px',
              minHeight: isMobile ? '400px' : '600px',
              backgroundColor: '#1e1e1e',
              color: '#00ff00',
              fontSize: isMobile ? '14px' : '20px',
              lineHeight: isMobile ? '1.4' : '1.6',
              whiteSpace: 'pre-wrap',
              position: 'relative',
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: text
                  .replace(/>/g, '<span style="color: #ff6b6b;">></span>')
                  .replace(/raihan@uc:~\$/g, '<span style="color: #4ecdc4;">raihan@uc:~$</span>')
                  .replace(/├──|└──/g, '<span style="color: #95a5a6;">$&</span>')
                  .replace(/│/g, '<span style="color: #95a5a6;">│</span>'),
              }}
            />
            {showCursor && (
              <span
                style={{
                  backgroundColor: '#00ff00',
                  color: '#1e1e1e',
                  padding: '0 3px',
                  marginLeft: '3px',
                  fontSize: isMobile ? '14px' : '18px',
                }}
              >
                |
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: '20px',
        boxSizing: 'border-box',
        gap: '20px',
      }}
    >
      {/* Profile Image */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: isMobile ? '20px' : '0',
        }}
      >
        <img
          src={profileImage}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            boxShadow: '0 0 15px #00ff00',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Images Section */}
      <div
        style={{
          display: isMobile ? 'inline-flex' : 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px',
          flex: 1,
          flexWrap: 'wrap',
        }}
      >
        {(isMobile ? personalImagePaths.slice(0, 2) : personalImagePaths).map((imagePath, index) => (
          <div
            key={index}
            style={{
              flex: isMobile ? '1' : 'initial',
              width: '100%',
              height: '280px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 0 10px #00ff00',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 20px #00ff00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 10px #00ff00';
            }}
          >
            <img
              src={imagePath}
              alt={`Raihan Rafeek ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      {/* Text Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#2a2a2a',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
        }}
      >
        <div
          style={{
            padding: isMobile ? '15px' : '20px',
            backgroundColor: '#1e1e1e',
            whiteSpace: 'pre-wrap',
            color: '#00ff00',
            fontSize: isMobile ? '14px' : '18px',
            lineHeight: isMobile ? '1.4' : '1.6',
            height: '100%',
          }}
          dangerouslySetInnerHTML={{
            __html:
              text.replace(/>/g, '<span style="color: #ff6b6b;">></span>') +
              (showCursor
                ? `<span style="background-color: #00ff00; color: #1e1e1e; padding: 0 3px; font-size: ${isMobile ? '14px' : '18px'};">|</span>`
                : ''),
          }}
        />
      </div>
    </div>
  );
};

export default About;