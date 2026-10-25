import React from 'react';
import CarouselShell from './CarouselShell';
import CardBody from './CardBody';

export const ExperienceGlassCard = ({ item, expanded = false }) => (
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
          decoding="async"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
    </div>
    <CardBody description={item.description} expanded={expanded} />
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

const renderExperience = (item, i, expanded) => <ExperienceGlassCard item={item} expanded={expanded} />;

const ExperienceCarousel = ({ items }) => (
  <CarouselShell items={items} label="experiences" renderCard={renderExperience} />
);

export default ExperienceCarousel;
