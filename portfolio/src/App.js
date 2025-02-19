import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './pages/About-me';
import LandingPage from './pages/landingPage';
import Experiences from './pages/Experience';
import Projects from './pages/Projects';
import ResumePage from './pages/resumePage';
import CommandLineNavigation from './components/CLI-query';
import WhyDidYouDoThat from './pages/Error';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

// Layout component to conditionally include Navbar and CommandLineNavigation
const Layout = () => {
  return (
    <div style={{ paddingBottom: '50px' }}> {/* Prevent overlap of bottom-fixed components */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/error" element={<WhyDidYouDoThat />} />
      </Routes>
      <CommandLineNavigation /> {/* Always visible command-line navigation */}
    </div>
  );
};

export default App;
