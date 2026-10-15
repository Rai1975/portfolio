import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Rendered via portal to document.body so it escapes the card's
// backdrop-filter / overflow-x ancestors, which would otherwise trap
// position:fixed and clip the overlay to the card.
const ImageModal = ({ src, title, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div className="gui-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} enlarged screenshot`}>
      <div className="gui-modal glass-strong" onClick={(e) => e.stopPropagation()}>
        <button className="gui-modal-close" onClick={onClose} aria-label="Close image">✖</button>
        <img src={src} alt={`${title} screenshot full size`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div className="gui-green" style={{ textAlign: 'center', marginTop: 8, fontSize: 13 }}>
          {title} — esc or click outside to close
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
