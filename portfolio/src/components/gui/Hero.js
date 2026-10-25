import React, { useEffect, useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

const FULL = 'whoami — raihan rafeek // senior cs @ uc';

const Hero = () => {
  const [text, setText] = useState('');
  const isMobile = useIsMobile();
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setText(FULL);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setText(FULL.slice(0, i));
      if (i >= FULL.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <header className="gui-hero glass-strong">
      <div>
        <img className="gui-avatar" src="/assets/me.webp" alt="Pixel-art portrait of Raihan" loading="eager" />
        <div className="gui-social-row">
          <a className="gui-social" href="https://github.com/rai1975" target="_blank" rel="noreferrer">github</a>
          <a className="gui-social" href="https://linkedin.com/in/raihan-rafeek" target="_blank" rel="noreferrer">linkedin</a>
          <a className="gui-social" href="mailto:rafeekrn@mail.uc.edu">email</a>
        </div>
      </div>
      <div>
        <div className="gui-typed" aria-label={FULL}>
          <span className="prompt">raihan@uc:~$ </span>
          <span className="gui-green">{text}</span>
          <span className="gui-caret" aria-hidden="true" />
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', margin: '12px 0 4px', color: '#fff' }}>
          Raihan Rafeek
        </h1>
        <p style={{ color: 'var(--gui-green)', margin: '0 0 10px', fontSize: 15 }}>
          cs. music. design.
        </p>
        <p style={{ color: 'var(--gui-text)', fontSize: 14, lineHeight: 1.7, maxWidth: 640 }}>
          ex-product intern @ benchmark gensuite · 2x swe @ inl · next innovation scholar <br /> <br/>
          I like to build with purpose, with the human experience at the center. Scroll for experience, projects and coursework,
          or flip to the terminal if you speak bash.
        </p>
        <div className="gui-cta-row">
          <a className="gui-btn" href="#experiences">↓ experiences</a>
          <a className="gui-btn secondary" href="/assets/Raihan_Resume.pdf" target="_blank" rel="noreferrer">resume.pdf</a>
          {!isMobile && <a className="gui-btn secondary" href="/terminal">open terminal</a>}
        </div>
        <p className="gui-muted" style={{ fontSize: 12, marginTop: 14 }}>
          ( tip: use ← → arrows or swipe inside each section to cycle cards )
        </p>
      </div>
    </header>
  );
};

export default Hero;
