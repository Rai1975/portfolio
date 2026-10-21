import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePortfolioData from '../../hooks/usePortfolioData';
import Hero from './Hero';
import Section from './Section';
import ExperienceCarousel from './ExperienceCarousel';
import ProjectsCarousel from './ProjectsCarousel';
import CourseworkCarousel from './CourseworkCarousel';
import ContactFooter from './ContactFooter';
import TopNav from './TopNav';

const HOME_LINKS = [
  { label: 'experiences', href: '#experiences' },
  { label: 'projects', href: '#projects' },
  { label: 'coursework', href: '#coursework' },
  { label: 'blog', to: '/blog' },
  { label: 'contact', href: '#contact' },
];

const GuiHome = () => {
  const { experiences, projects, coursework } = usePortfolioData();
  const location = useLocation();

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
        <TopNav links={HOME_LINKS} />

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
