import React, { useState } from 'react';
import CarouselShell from './CarouselShell';
import CardBody from './CardBody';
import ImageModal from './ImageModal';

export const CourseworkGlassCard = ({ item, expanded = false }) => {
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
          decoding="async"
          onClick={(e) => { e.stopPropagation(); setEnlarged(true); }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <CardBody description={item.description} expanded={expanded} />
      {item.link && (
        <a className="gui-card-link" href={item.link} target="_blank" rel="noreferrer">view coursework ↗</a>
      )}
      {enlarged && item.screenshot && (
        <ImageModal src={item.screenshot} title={item.title} onClose={() => setEnlarged(false)} />
      )}
    </article>
  );
};

const renderCoursework = (item, i, expanded) => <CourseworkGlassCard item={item} expanded={expanded} />;

const CourseworkCarousel = ({ items }) => (
  <CarouselShell items={items} label="coursework" renderCard={renderCoursework} />
);

export default CourseworkCarousel;
