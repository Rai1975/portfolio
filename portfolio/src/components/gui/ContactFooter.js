import React from 'react';

const cards = [
  { label: 'github', value: 'github.com/rai1975', href: 'https://github.com/rai1975' },
  { label: 'linkedin', value: 'linkedin.com/in/raihan-rafeek', href: 'https://linkedin.com/in/raihan-rafeek' },
  { label: 'email', value: 'rafeekrn@mail.uc.edu', href: 'mailto:rafeekrn@mail.uc.edu' },
  { label: 'resume', value: 'Raihan_Resume.pdf', href: '/assets/Raihan_Resume.pdf' },
];

const ContactFooter = () => (
  <>
    <div className="gui-contact-grid">
      {cards.map((c) => (
        <a key={c.label} className="gui-contact-card glass" href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
          <b>$ {c.label}</b>
          <span>{c.value}</span>
        </a>
      ))}
    </div>
    <footer className="gui-footer glass">
      <span className="prompt">raihan@uc:~$ </span>
      <span>exit — thanks for scrolling · © {new Date().getFullYear()} raihan rafeek</span>
    </footer>
  </>
);

export default ContactFooter;
