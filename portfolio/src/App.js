import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './pages/About-me';
import LandingPage from './pages/landingPage';
import Experiences from './pages/Experience';
import Projects from './pages/Projects';
import CommandLineNavigation from './components/CLI-query';
import WhyDidYouDoThat from './pages/Error';
import Coursework from './pages/Coursework';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = () => {
  return (
    <div style={{ paddingTop: '60px', paddingBottom: '40px', background: '#1e1e1e;'}}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <Navbar />
      </div>
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
        <CommandLineNavigation />
      </div>
    </div>
  );
};

export default App;
