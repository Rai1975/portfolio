import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './components/About';
import LandingPage from './pages/landingPage';
import Experiences from './pages/Experience';
import Projects from './pages/Projects';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

// Layout component to conditionally include Navbar
const Layout = () => {
  return (
    <>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
};

export default App;
