import React, { useState } from 'react';
import CarouselShell from './CarouselShell';
import ImageModal from './ImageModal';

const clean = (line) => line.replace(/^>\s?/, '');

export const ProjectGlassCard = ({ item }) => {
  const [enlarged, setEnlarged] = useState(false);

  return (
    <article className="gui-card glass" aria-label={item.title}>
      <div className="gui-card-title">{item.title}</div>
      <div className="gui-chip-row">
        {item.category && <span className="gui-chip">{item.category}</span>}
        {item.stack && item.stack.split(',').map((s) => (
          <span key={s} className="gui-chip cyan">{s.trim()}</span>
        ))}
      </div>
      {item.screenshot && (
        <img
          className="gui-card-shot"
          src={item.screenshot}
          alt={`${item.title} screenshot — click to enlarge`}
          title="Click to enlarge"
          loading="lazy"
          onClick={(e) => { e.stopPropagation(); setEnlarged(true); }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      {item.description && (
        <div className="gui-card-body">
          {item.description.split('\n').filter((l) => l.trim()).map((line, i) => (
            <div key={i}><span className="bullet">▸ </span>{clean(line.trim())}</div>
          ))}
        </div>
      )}
      {item.link ? (
        <a className="gui-card-link" href={item.link} target="_blank" rel="noreferrer">view project ↗</a>
      ) : (
        <span className="gui-card-meta" style={{ marginTop: 12 }}>(personal build — no link)</span>
      )}
      {enlarged && item.screenshot && (
        <ImageModal src={item.screenshot} title={item.title} onClose={() => setEnlarged(false)} />
      )}
    </article>
  );
};

const ProjectsCarousel = ({ items }) => (
  <CarouselShell items={items} label="projects" renderCard={(item) => <ProjectGlassCard item={item} />} />
);

export default ProjectsCarousel;
