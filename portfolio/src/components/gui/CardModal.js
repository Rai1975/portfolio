import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Full-screen reader for a carousel card. Portaled to document.body for the
// same reason as ImageModal (backdrop-filter / overflow ancestors).
const CardModal = ({ label, onClose, children }) => {
  useEffect(() => {
    // ImageModal (opened from inside this card) handles Escape first in the
    // capture phase and marks it handled, so only the image closes.
    const onKey = (e) => { if (e.key === 'Escape' && !e.defaultPrevented) onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div className="gui-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${label} details`}>
      <div className="gui-modal gui-card-modal glass-strong" onClick={(e) => e.stopPropagation()}>
        <button className="gui-modal-close" onClick={onClose} aria-label="Close" autoFocus>✖</button>
        {children}
        <div className="gui-card-modal-hint">esc or click outside to close</div>
      </div>
    </div>,
    document.body
  );
};

export default CardModal;
