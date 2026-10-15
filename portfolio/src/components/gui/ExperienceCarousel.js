import React from 'react';
import CarouselShell from './CarouselShell';

const clean = (line) => line.replace(/^>\s?/, '');

export const ExperienceGlassCard = ({ item }) => (
  <article className="gui-card glass" aria-label={`${item.title} at ${item.organization}`}>
    <div className="gui-card-head">
      <div>
        <div className="gui-card-title">{item.title} — {item.organization}</div>
        <div className="gui-card-meta">{item.date}</div>
      </div>
      {item.logo && (
        <img
          className="gui-card-logo"
          src={item.logo}
          alt={`${item.organization} logo`}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
    </div>
    {item.description && (
      <div className="gui-card-body">
        {item.description.split('\n').filter((l) => l.trim()).map((line, i) => (
          <div key={i}><span className="bullet">▸ </span>{clean(line.trim())}</div>
        ))}
      </div>
    )}
    {item.skills?.length > 0 && (
      <div className="gui-chip-row">
        {item.skills.map((s) => <span key={s} className="gui-chip cyan">{s}</span>)}
      </div>
    )}
    {item.link && (
      <a className="gui-card-link" href={item.link} target="_blank" rel="noreferrer">
        {item.link.replace(/^https?:\/\//, '')} ↗
      </a>
    )}
  </article>
);

const ExperienceCarousel = ({ items }) => (
  <CarouselShell items={items} label="experiences" renderCard={(item) => <ExperienceGlassCard item={item} />} />
);

export default ExperienceCarousel;
