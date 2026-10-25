import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CardModal from './CardModal';

const CarouselShell = ({ items, renderCard, label }) => {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const closeModal = useCallback(() => setOpenIdx(null), []);
  const count = items?.length ?? 0;

  // Card width + gap, cached so scrolling doesn't force a layout read.
  const stepRef = useRef(0);
  const step = useCallback(() => {
    if (stepRef.current) return stepRef.current;
    const el = trackRef.current;
    const first = el?.querySelector(':scope > *');
    if (!first) return 360;
    stepRef.current = first.offsetWidth + 16;
    return stepRef.current;
  }, []);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const threshold = 8;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= threshold) {
      setCanLeft(false);
      setCanRight(false);
      return;
    }
    setCanLeft(el.scrollLeft > threshold);
    setCanRight(el.scrollLeft < maxScroll - threshold);
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
    // Coalesce scroll events to at most one state update per frame.
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const w = step();
        setIdx(Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / w))));
        updateEdges();
      });
    };
    const onResize = () => {
      stepRef.current = 0;
      updateEdges();
    };
    updateEdges();
    const frame = requestAnimationFrame(updateEdges);
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    let observer = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(onResize);
      observer.observe(el);
    }
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (observer) observer.disconnect();
    };
  }, [count, step, updateEdges, items]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1); }
    if (e.key === 'Enter' && e.target === trackRef.current) { e.preventDefault(); setOpenIdx(idx); }
  };

  // Delegated: clicking anywhere on a card (except its links, buttons or
  // screenshot) opens it full screen. The contains() check skips clicks that
  // bubble up through React portals such as ImageModal.
  const onTrackClick = (e) => {
    const el = trackRef.current;
    if (!el || !el.contains(e.target)) return;
    if (e.target.closest('a, button, .gui-card-shot')) return;
    if (window.getSelection()?.toString()) return;
    const card = e.target.closest('.gui-card');
    if (!card) return;
    const i = Array.prototype.indexOf.call(el.children, card);
    if (i >= 0) setOpenIdx(i);
  };

  // Cards only depend on items, so index/dot changes don't re-render them.
  const cards = useMemo(() => (items || []).map((item, i) => (
    <React.Fragment key={item.title ? `${item.title}-${i}` : i}>
      {renderCard(item, i)}
    </React.Fragment>
  )), [items, renderCard]);

  if (!items) {
    return <div className="gui-state glass">loading {label}…</div>;
  }
  if (items.length === 0) {
    return <div className="gui-state glass">{label} is empty or failed to load.</div>;
  }

  return (
    <div className={`gui-carousel-wrap${canLeft ? ' has-more-left' : ''}${canRight ? ' has-more-right' : ''}`}>
      <div className="gui-carousel-viewport">
        <div
          className="gui-carousel"
          ref={trackRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onClick={onTrackClick}
          aria-label={`${label} carousel — use left and right arrows to cycle, enter to expand`}
        >
          {cards}
        </div>
        <div className="gui-fade gui-fade-left" aria-hidden="true" />
        <div className="gui-fade gui-fade-right" aria-hidden="true" />
      </div>
      {openIdx !== null && items[openIdx] && (
        <CardModal label={items[openIdx].title || label} onClose={closeModal}>
          {renderCard(items[openIdx], openIdx, true)}
        </CardModal>
      )}
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
