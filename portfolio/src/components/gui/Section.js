import React from 'react';

const Section = ({ id, command, title, sub, children }) => (
  <section id={id} className="gui-section" aria-label={title}>
    <div className="gui-section-head glass-strong">
      <div className="gui-section-title">
        <span className="prompt">raihan@uc:~$</span> <span>cat {command}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 15 }}>
        <span className="gui-orange" style={{ fontWeight: 'bold' }}>➤ {title}</span>
      </div>
      {sub && <div className="gui-section-sub">{sub}</div>}
    </div>
    {children}
  </section>
);

export default Section;
