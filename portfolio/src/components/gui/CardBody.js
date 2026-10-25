import React from 'react';

// Characters of description shown on a collapsed card; the modal shows all.
export const CARD_TEXT_LIMIT = 200;

const clean = (line) => line.replace(/^>\s?/, '');

// Take bullets until the character budget runs out, cutting the last one
// at a word boundary.
const truncateLines = (lines, limit) => {
  const out = [];
  let left = limit;
  for (const line of lines) {
    if (line.length <= left) {
      out.push(line);
      left -= line.length;
      continue;
    }
    const cut = line.slice(0, left).replace(/\s+\S*$/, '');
    if (cut) out.push(`${cut}…`);
    else if (out.length) out[out.length - 1] += '…';
    return { lines: out, truncated: true };
  }
  return { lines: out, truncated: false };
};

const CardBody = ({ description, expanded }) => {
  if (!description) return null;
  const all = description.split('\n').map((l) => clean(l.trim())).filter(Boolean);
  const { lines, truncated } = expanded
    ? { lines: all, truncated: false }
    : truncateLines(all, CARD_TEXT_LIMIT);

  return (
    <div className="gui-card-body">
      {lines.map((line, i) => (
        <div key={i}><span className="bullet">▸ </span>{line}</div>
      ))}
      {truncated && <div className="gui-card-expand">click to expand ↗</div>}
    </div>
  );
};

export default CardBody;
