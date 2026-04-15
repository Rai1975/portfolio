import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About-me';
import LandingPage from './pages/landingPage';
import Experiences from './pages/Experience';
import Projects from './pages/Projects';
import WhyDidYouDoThat from './pages/Error';
import Coursework from './pages/Coursework';

const App = () => {
  return (
    <Router>
      <About />
    </Router>
  );
};

const Layout = () => {
  return (
    <div style={{ paddingTop: '60px', paddingBottom: '40px', background: '#1e1e1e;'}}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/error" element={<WhyDidYouDoThat />} />
        <Route path="/class" element={<Coursework />} />
      </Routes>
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
      </div>
    </div>
  );
};

export default App;
