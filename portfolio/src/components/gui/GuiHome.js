import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import usePortfolioData from '../../hooks/usePortfolioData';
import useIsMobile from '../../hooks/useIsMobile';
import Hero from './Hero';
import Section from './Section';
import ExperienceCarousel from './ExperienceCarousel';
import ProjectsCarousel from './ProjectsCarousel';
import CourseworkCarousel from './CourseworkCarousel';
import ContactFooter from './ContactFooter';

const GuiHome = () => {
  const { experiences, projects, coursework } = usePortfolioData();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when switching back to desktop layout.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Support /#experiences style deep links (incl. legacy route redirects).
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        // Defer one frame so carousel layout settles first.
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    }
  }, [location.hash]);

  return (
    <div className="gui-root">
      <div className="gui-inner">
        <nav className="gui-topnav glass-strong" aria-label="Portfolio sections">
          <span className="dots" aria-hidden="true">
            <span className="dot" style={{ background: '#ff5f57' }} />
            <span className="dot" style={{ background: '#ffbd2e' }} />
            <span className="dot" style={{ background: '#28c840' }} />
          </span>
          <span className="prompt" style={{ fontSize: 13 }}>raihan@uc:~</span>
          {isMobile ? (
            <>
              <button
                className="gui-hamburger"
                aria-expanded={menuOpen}
                aria-controls="gui-mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
              </button>
              {menuOpen && (
                <div id="gui-mobile-menu" className="gui-mobile-menu glass-strong">
                  <a className="gui-navlink" href="#experiences" onClick={() => setMenuOpen(false)}>experiences</a>
                  <a className="gui-navlink" href="#projects" onClick={() => setMenuOpen(false)}>projects</a>
                  <a className="gui-navlink" href="#coursework" onClick={() => setMenuOpen(false)}>coursework</a>
                  <a className="gui-navlink" href="#contact" onClick={() => setMenuOpen(false)}>contact</a>
                </div>
              )}
            </>
          ) : (
            <>
              <a className="gui-navlink" href="#experiences">experiences</a>
              <a className="gui-navlink" href="#projects">projects</a>
              <a className="gui-navlink" href="#coursework">coursework</a>
              <a className="gui-navlink" href="#contact">contact</a>
              <Link className="gui-navlink" to="/terminal" style={{ marginLeft: 'auto' }}>&gt;_ terminal</Link>
            </>
          )}
        </nav>

        <Hero />

        <Section
          id="experiences"
          command="experiences.json"
          title="experiences"
          sub="swipe or arrow through roles — research, industry, innovation"
        >
          <ExperienceCarousel items={experiences} />
        </Section>

        <Section
          id="projects"
          command="projects.json"
          title="projects"
          sub="things i've built — click a screenshot to enlarge"
        >
          <ProjectsCarousel items={projects} />
        </Section>

        <Section
          id="coursework"
          command="coursework.json"
          title="coursework"
          sub="selected classwork — intelligent systems + interfaces"
        >
          <CourseworkCarousel items={coursework} />
        </Section>

        <div id="contact" className="gui-section" style={{ scrollMarginTop: 90 }}>
          <div className="gui-section-head glass-strong">
            <div className="gui-section-title">
              <span className="prompt">raihan@uc:~$</span> <span>cat contact.txt</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 15 }}>
              <span className="gui-orange" style={{ fontWeight: 'bold' }}>➤ contact</span>
            </div>
          </div>
          <ContactFooter />
        </div>
      </div>
    </div>
  );
};

export default GuiHome;
