import React, { useState } from 'react';
import CarouselShell from './CarouselShell';
import ImageModal from './ImageModal';

const clean = (line) => line.replace(/^>\s?/, '');

export const CourseworkGlassCard = ({ item }) => {
  const [enlarged, setEnlarged] = useState(false);

  return (
    <article className="gui-card glass" aria-label={item.title}>
      <div className="gui-card-title">{item.title}</div>
      {item.stack && (
        <div className="gui-chip-row">
          {item.stack.split('|').map((s) => (
            <span key={s} className="gui-chip">{s.trim()}</span>
          ))}
        </div>
      )}
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
      {item.link && (
        <a className="gui-card-link" href={item.link} target="_blank" rel="noreferrer">view coursework ↗</a>
      )}
      {enlarged && item.screenshot && (
        <ImageModal src={item.screenshot} title={item.title} onClose={() => setEnlarged(false)} />
      )}
    </article>
  );
};

const CourseworkCarousel = ({ items }) => (
  <CarouselShell items={items} label="coursework" renderCard={(item) => <CourseworkGlassCard item={item} />} />
);

export default CourseworkCarousel;
