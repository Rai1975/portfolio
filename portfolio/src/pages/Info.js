import React, { useEffect, useState, Component } from 'react';

// Error Boundary component to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#1e1e1e',
          color: '#ff0000',
          border: '1px solid #ff0000',
          borderRadius: '5px',
          textAlign: 'center',
          margin: '20px'
        }}>
          <h2>Something went wrong</h2>
          <p>The application encountered an error. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#444',
              color: '#00ff00',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '15px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const About = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [imageError, setImageError] = useState({
    profile: false,
    github: false,
    linkedin: false,
    email: false
  });

  // Default fallback image for when primary images fail to load
  const fallbackImage = '/assets/whitebox.png';

  const gitHubImage = '/assets/github-11-xxl.png';
  const linkedInImage = '/assets/white_linkedin.png';
  const emailImage = '/assets/ms-outlook-white.png';

  const contentChunks = [
    { type: 'link', value: '/about', label: '\n> More About Me\n', small: false },
    { type: 'link', value: '/projects', label: '> Projects\n', small: false },
    {
      type: 'download',
      value: '/assets/Raihan_Resume.pdf',
      label: '> Resume\n',
      small: false,
      fallbackHref: 'mailto:rafeekrn@mail.uc.edu?subject=Resume%20Request&body=Hello%20Raihan%2C%0A%0AI%20tried%20to%20download%20your%20resume%20but%20encountered%20an%20issue.%20Could%20you%20please%20send%20me%20your%20resume%3F%0A%0AThank%20you%2C'
    },
    { type: 'link', value: '/experiences', label: '> Experience\n', small: false },
  ];

  const typingSpeed = 80;

  // Function to handle image load errors
  const handleImageError = (imageType) => {
    setImageError(prev => ({
      ...prev,
      [imageType]: true
    }));
    console.error(`Failed to load ${imageType} image`);
  };

  useEffect(() => {
    const type = () => {
      if (currentIndex < contentChunks.length) {
        const chunk = contentChunks[currentIndex];
        let chunkText = '';

        try {
          if (chunk.type === 'text') {
            chunkText = chunk.value || 'Content unavailable';
          } else if (chunk.type === 'link') {
            // Safe link generation with error handling
            const safeValue = chunk.value || '#';
            const safeLabel = chunk.label || 'Link';
            const label = `<a href="${safeValue}" style="color: #00ff00; text-decoration: none;">${safeLabel}</a>`;
            chunkText = label;
          } else if (chunk.type === 'download') {
            // Add error handler for resume download with fallback
            const safeValue = chunk.value || chunk.fallbackHref || '#';
            const safeLabel = chunk.label || 'Download';
            const downloadAttr = chunk.value ? 'download="Raihan_Rafeek_Resume.pdf"' : '';

            const label = `<a href="${safeValue}" ${downloadAttr}
              style="color: #00ff00; text-decoration: none;"
              onerror="this.onerror=null; this.href='${chunk.fallbackHref || '#'}';">
              ${safeLabel}</a>`;
            chunkText = label;
          } else {
            // Handle unknown chunk types gracefully
            console.warn(`Unknown content chunk type: ${chunk.type}`);
            chunkText = '';
          }
        } catch (error) {
          console.error('Error processing content chunk:', error);
          chunkText = '<span style="color: #ff0000;">Error loading content</span>';
        }

        setText((prev) => prev + chunkText);
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Consolas, monospace',
        padding: '15px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Profile Picture with Neon Glow and Error Handling */}
      <img
        src={imageError.profile ? fallbackImage : "/assets/me.webp"}
        alt="Profile"
        onError={() => handleImageError('profile')}
        style={{
          imageRendering: 'pixelated',
          width: '80%',
          maxWidth: '500px',
          marginBottom: '20px',
          height: 'auto',
          boxShadow: '0 0 5px 2px rgba(0, 255, 0, 0.8)', // Neon green glow
          objectFit: imageError.profile ? 'contain' : 'cover',
        }}
      />

      {/* Clickable Images for Links with Error Handling */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <a href="https://github.com/rai1975" target="_blank" rel="noopener noreferrer">
          <img
            src={imageError.github ? fallbackImage : gitHubImage}
            alt="GitHub"
            onError={() => handleImageError('github')}
            style={{
              width: '75px',
              height: '75px',
              cursor: 'pointer',
              border: imageError.github ? '1px solid #00ff00' : 'none'
            }}
          />
          {imageError.github && <small style={{ color: '#00ff00', display: 'block', textAlign: 'center' }}>GitHub</small>}
        </a>
        <a href="https://linkedin.com/in/raihan-rafeek" target="_blank" rel="noopener noreferrer">
          <img
            src={imageError.linkedin ? fallbackImage : linkedInImage}
            alt="LinkedIn"
            onError={() => handleImageError('linkedin')}
            style={{
              width: '80px',
              height: '80px',
              cursor: 'pointer',
              border: imageError.linkedin ? '1px solid #00ff00' : 'none'
            }}
          />
          {imageError.linkedin && <small style={{ color: '#00ff00', display: 'block', textAlign: 'center' }}>LinkedIn</small>}
        </a>
        <a href="mailto:rafeekrn@mail.uc.edu" target="_blank" rel="noopener noreferrer">
          <img
            src={imageError.email ? fallbackImage : emailImage}
            alt="Email"
            onError={() => handleImageError('email')}
            style={{
              width: '80px',
              height: '80px',
              cursor: 'pointer',
              border: imageError.email ? '1px solid #00ff00' : 'none'
            }}
          />
          {imageError.email && <small style={{ color: '#00ff00', display: 'block', textAlign: 'center' }}>Email</small>}
        </a>
      </div>

      {/* Typing Animation with Error Boundary */}
      <div
        style={{
          fontSize: '32px',
          whiteSpace: 'pre-wrap',
          textAlign: 'left',
          flexGrow: 1,
          wordBreak: 'break-word',
        }}
        dangerouslySetInnerHTML={{
          __html: text || '<span style="color: #ff0000;">Error loading content. Please refresh.</span>'
        }}
      />
    </div>
  );
};

// Wrapping the component with the error boundary
const InfoPage = () => (
  <ErrorBoundary>
    <About />
  </ErrorBoundary>
);

export default InfoPage;
