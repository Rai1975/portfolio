import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const aboutMe = `Hello!\nMy name is Raihan Rafeek, I am a third year computer science major at the University of Cincinnati.
  \nI am interested in data science, machine learning, and artificial intelligence. I enjoy building things and prefer to learn new things by making.
  \nOutside the software realm, I also love climbing, motorsports, photography, and music!\n`

  const altAboutme = `Hey there! I'm a curious builder who loves turning ideas into reality. Whether it’s diving into machine learning and AI or tinkering with aerospace software, I’m all about exploring cool, new challenges.\n
When I’m not geeking out over code, you can probably find me scaling a climbing wall or playing Minecraft. Life’s an adventure, and I’m here to enjoy every bit of it. I'm also a CLI monkey 🐵`

  const contentChunks = [
    { type: 'text', value: isLandingPage ? aboutMe : altAboutme }
  ];

  const typingSpeed = 60;

  useEffect(() => {
    const type = () => {
      if (currentIndex < contentChunks.length) {
        const currentChunk = contentChunks[currentIndex];
        setText((prev) => prev + (currentChunk.type === 'text' ? currentChunk.value : ''));

        if (currentChunk.type === 'link') {
          setText((prev) => prev + `<a href="${currentChunk.value}" rel="noopener noreferrer" style="color: #00ff00; text-decoration: none;">${currentChunk.label}</a>\n`);
        }

        setCurrentIndex((prev) => prev + 1);
      } else {
        setDone(true);
      }
    };

    if (!done) {
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, done, contentChunks]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const personalImagePaths = [
    'assets/tetons.jpg',
    'assets/teaching.jpg',
    'assets/rock.jpg',
    'assets/climbing.jpg'
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isLandingPage ? 'column' : isMobile ? 'column' : 'row',
        alignItems: isLandingPage ? 'left' : 'flex-start',
        justifyContent: isLandingPage ? 'left' : 'center',
        minHeight: isLandingPage ? '100vh' : 'calc(100vh - 30px)',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        padding: isLandingPage ? '0px' : '20px',
        boxSizing: 'border-box',
        gap: isLandingPage ? '0 ' : '20px',
      }}
    >
      {!isLandingPage && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            maxWidth: '600px',
            margin: isMobile ? '0 auto' : '0',
          }}
        >
          {personalImagePaths.map((imagePath, index) => (
            <div
              key={index}
              style={{
                width: isMobile ? '100%' : '280px',
                height: '280px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 0 10px #00ff00',
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
      )}

      <div
        style={{
          width: isLandingPage ? '100%' : isMobile ? '100%' : '40%',
          marginLeft: isLandingPage ? '0' : isMobile ? '0' : '20px',
          backgroundColor: '#1e1e1e',
          borderRadius: isLandingPage ? '0 0 10px 10px' : '10px',
          padding: '15px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          color: '#00ff00',
          fontSize: isLandingPage ? '32px' : '30px',
          textAlign: isLandingPage ? 'left' : 'center',
          maxWidth: '600px',
        }}
        dangerouslySetInnerHTML={{
          __html: text + (done && isMobile && isLandingPage ? '\n\n>>> Scroll to know more about me <<<\n' : ''),
        }}
      />

      <style>
        {`
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

export default About;