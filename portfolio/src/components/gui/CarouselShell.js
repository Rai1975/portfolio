import React, { useCallback, useEffect, useRef, useState } from 'react';

const CarouselShell = ({ items, renderCard, label }) => {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const count = items?.length ?? 0;

  const step = useCallback(() => {
    const el = trackRef.current;
    const first = el?.querySelector(':scope > *');
    return first ? first.offsetWidth + 16 : 360;
  }, []);

  const goTo = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(items.length - 1, i));
    el.scrollTo({ left: next * step(), behavior: 'smooth' });
    setIdx(next);
  }, [items, step]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = step();
      setIdx(Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / w))));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [count, step]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1); }
  };

  if (!items) {
    return <div className="gui-state glass">loading {label}…</div>;
  }
  if (items.length === 0) {
    return <div className="gui-state glass">{label} is empty or failed to load.</div>;
  }

  return (
    <div className="gui-carousel-wrap">
      <div
        className="gui-carousel"
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${label} carousel — use left and right arrows to cycle`}
      >
        {items.map((item, i) => (
          <React.Fragment key={item.title ? `${item.title}-${i}` : i}>
            {renderCard(item, i)}
          </React.Fragment>
        ))}
      </div>
      <div className="gui-carousel-bar">
        <button className="gui-arrow" onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label={`Previous ${label}`}>
          &lt; prev
        </button>
        <button className="gui-arrow" onClick={() => goTo(idx + 1)} disabled={idx === count - 1} aria-label={`Next ${label}`}>
          next &gt;
        </button>
        <span className="gui-counter" aria-live="polite">{idx + 1} / {count}</span>
        <div className="gui-dots" role="tablist" aria-label={`${label} position`}>
          {items.map((_, i) => (
            <button
              key={i}
              className={`gui-dot${i === idx ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${label} ${i + 1}`}
              role="tab"
              aria-selected={i === idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselShell;
