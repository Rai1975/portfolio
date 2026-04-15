import React, { useState, useEffect, useRef } from 'react';

const COMMAND_LIST = [
  'help', 'whoami', 'bio', 'skills', 'interests', 'projects',
  'contact', 'education', 'music', 'ls', 'date', 'clear',
  'uname -a', 'neofetch', 'fortune', 'sudo', 'echo', 'cat',
  'pwd', 'cd', 'experience', 'coursework',
];

const COLORS = {
  out: '#00ff00',
  err: '#ff5252',
  path: '#ffab40',
  comment: '#666',
};

const staticCommands = {
  help: () => [
    { t: 'out', v: 'Available commands:' },
    { t: 'path', v: '  whoami      → about me' },
    { t: 'path', v: '  bio         → short bio' },
    { t: 'path', v: '  skills      → tech stack' },
    { t: 'path', v: '  interests   → what I\'m into' },
    { t: 'path', v: '  projects    → things I\'ve built' },
    { t: 'path', v: '  experience  → work & research experience' },
    { t: 'path', v: '  coursework  → relevant courses' },
    { t: 'path', v: '  contact     → how to reach me' },
    { t: 'path', v: '  education   → academic background' },
    { t: 'path', v: '  music       → current obsessions' },
    { t: 'path', v: '  ls          → list directory' },
    { t: 'path', v: '  cat <file>  → read a file' },
    { t: 'path', v: '  echo <text> → print text' },
    { t: 'path', v: '  date        → current date/time' },
    { t: 'path', v: '  clear       → clear terminal' },
    { t: 'path', v: '  uname -a    → system info' },
    { t: 'path', v: '  neofetch    → system summary' },
    { t: 'path', v: '  fortune     → random wisdom' },
    { t: 'path', v: '  sudo <cmd>  → try your luck' },
  ],
  whoami: () => [
    { t: 'out', v: 'raihan rafeek' },
    { t: 'out', v: '4th year cs @ university of cincinnati' },
    { t: 'out', v: 'product engineer intern @ benchmark gensuite. NEXT innovation scholar.' },
    { t: 'out', v: 'computing. programming. music. design.' },
  ],
  bio: () => [
    { t: 'out', v: 'im a curious builder who likes to build with purpose.' },
    { t: 'out', v: 'i live at the intersection of cs, art and design.' },
    { t: 'out', v: '' },
    { t: 'out', v: 'philosophy: learn learn learn, build build build.' },
  ],
  skills: () => [
    { t: 'path', v: 'on the desk ->' },
    { t: 'path', v: 'languages:   python, ruby, typescript, c++, java, sql, coldfusion (niche, i know)' },
    { t: 'path', v: 'ml/ai:       pytorch, scikit-learn, huggingface, langchain, strands' },
    { t: 'path', v: 'backend:     flask, ruby on rails, node.js, postgresql' },
    { t: 'path', v: 'frontend:    react, angular' },
    { t: 'path', v: 'infra:       docker, aws, cloudflare, linux (zsh and bash)' },
    { t: 'path', v: ' ' },
    { t: 'path', v: 'in the makerspace:       3d printing, woodworking, laser cutting' },
    { t: 'path', v: 'in the studio:           waveform, logic pro, davinci resolve, adobe illustrator' },
    { t: 'path', v: 'in the music store:      guitar, keyboard/piano' },
    { t: 'path', v: ' ' },
    { t: 'path', v: 'the miscellanious:       human centered design and research, futures research (basic)' },
    { t: 'path', v: 'the miscellanious pt2:   photography, speedcubing' },
    { t: 'comment', v: '(still learning — always)' },
  ],
  interests: () => [
    { t: 'out', v: 'technical/' },
    { t: 'out', v: '  ├── ai.py' },
    { t: 'out', v: '  ├── backend_development.cfc' },
    { t: 'out', v: '  ├── experience_research.jsx' },
    { t: 'out', v: '  └── database_design.md' },
    { t: 'out', v: 'personal/' },
    { t: 'out', v: '  ├── rock_climbing.gear' },
    { t: 'out', v: '  ├── motorsports.mp4' },
    { t: 'out', v: '  ├── photography.raw' },
    { t: 'out', v: '  └── music_collection/  ← seriously, let\'s talk music!' },
  ],
  contact: () => [
    { t: 'out', v: 'GitHub:    github.com/raihanrafeek' },
    { t: 'out', v: 'LinkedIn:  linkedin.com/in/raihanrafeek' },
    { t: 'out', v: 'Email:     rafeek.rn@mail.uc.edu' },
    { t: 'comment', v: '(or just catch me on campus)' },
  ],
  education: () => [
    { t: 'path', v: 'university of cincinnati' },
    { t: 'out', v: '  undergrad computer science — 4th year' },
    { t: 'out', v: '  focus: very focused... jk i like ai/nlp/ml/backend+infra' },
    { t: 'out', v: '  GPA: 3.97' },
    { t: 'comment', v: 'i have a life, i swear' },
  ],
  music: () => [
    { t: 'out', v: 'currently listening to:' },
    { t: 'path', v: '  ├── periphery — luck as a constant' },
    { t: 'path', v: '  ├── fakemink — baklava' },
    { t: 'path', v: '  ├── deadmau5 — ghosts n stuff' },
    { t: 'path', v: '  └── justice — genesis' },
    { t: 'comment', v: 'Genre: "yes"' },
  ],
  ls: () => [
    { t: 'out', v: 'bio.txt         projects.md     skills.json' },
    { t: 'out', v: 'interests/      music/          contact.txt' },
    { t: 'out', v: 'resume.pdf      .secrets        .bashrc' },
    { t: 'out', v: 'experience.json projects.json   coursework.json' },
  ],
  date: () => [{ t: 'out', v: new Date().toString() }],
  'uname -a': () => [
    { t: 'out', v: 'Linux raihan-uc 6.5.0 #1 SMP x86_64 GNU/Linux' },
    { t: 'comment', v: '(actually running in your browser lol)' },
  ],
  neofetch: () => [
    { t: 'out', v: '        .-.      raihan@uc' },
    { t: 'out', v: '       (o o)     ---------' },
    { t: 'out', v: '       | O |     OS: UC Campus Linux 6.7' },
    { t: 'out', v: '        ---      Shell: zsh 5.9' },
    { t: 'out', v: '                 Editor: VSCode (don\'t @ me, you know its good)' },
    { t: 'out', v: '                 Hobbies: music, reading, running/climbing' },
    { t: 'out', v: '                 Status: me and my caffiene against the world' },
    { t: 'out', v: '                 Hairline: turkey 2028' },
  ],
  fortune: () => {
    const quotes = [
      'A good programmer looks both ways before crossing a one-way street.',
      'There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.',
      'It works on my machine. Ship my machine.',
      'The best error message is the one that never shows up.',
      'sudo make me a sandwich.',
      'git commit -m "final final v3 ACTUALLY FINAL"',
      '// TODO: comment this later  (7 years ago)',
      'Have you tried turning it off and back on again?',
    ];
    return [{ t: 'out', v: quotes[Math.floor(Math.random() * quotes.length)] }];
  },
};

const catFiles = {
  'bio.txt': [
    { t: 'out', v: 'i\'m a curious builder who turns ideas into reality.' },
    { t: 'out', v: 'passionate about ml, backend systems, and clean design.' },
    { t: 'out', v: 'rock climber. music nerd. cli monkey (performative vim user).' },
  ],
  'projects.md': [
    { t: 'comment', v: 'tip: run `projects` for the full interactive view' },
  ],
  'skills.json': [
    { t: 'out', v: '{' },
    { t: 'path', v: '  "languages": ["Python","TypeScript","C#","Java"],' },
    { t: 'path', v: '  "ml": ["PyTorch","scikit-learn","HuggingFace"],' },
    { t: 'path', v: '  "web": ["React","Next.js","FastAPI","Node.js"],' },
    { t: 'path', v: '  "tools": ["Docker","GCP","Linux","Git"]' },
    { t: 'out', v: '}' },
  ],
  '.secrets': [{ t: 'err', v: 'Permission denied.' }],
  '.bashrc': [
    { t: 'comment', v: '# raihan\'s bashrc' },
    { t: 'out', v: 'alias gs="git status"' },
    { t: 'out', v: 'alias cls="clear"' },
    { t: 'out', v: 'alias yolo="git push --force"' },
    { t: 'comment', v: '# yes, I use that alias' },
  ],
  'resume.pdf': [{ t: 'err', v: 'Binary file — try `contact` to reach out for a copy.' }],
  'contact.txt': staticCommands.contact(),
  'experience.json': [{ t: 'comment', v: 'tip: run `experience` for the formatted view' }],
  'projects.json': [{ t: 'comment', v: 'tip: run `projects` for the formatted view' }],
  'coursework.json': [{ t: 'comment', v: 'tip: run `coursework` for the formatted view' }],
};

// Render experience entries from JSON
function renderExperience(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return [{ t: 'err', v: 'experience.json is empty or invalid.' }];
  }
  const lines = [];
  data.forEach((item, idx) => {
    if (idx > 0) lines.push({ t: 'comment', v: '' });
    lines.push({ t: 'path', v: `[${idx + 1}] ${item.title} — ${item.organization}` });
    lines.push({ t: 'comment', v: `    ${item.date}` });
    if (item.link) lines.push({ t: 'comment', v: `    ${item.link}` });
    if (item.description) {
      item.description.split('\n').forEach(line => {
        if (line.trim()) lines.push({ t: 'out', v: `    ${line.trim()}` });
      });
    }
  });
  return lines;
}

// Render projects entries from JSON
function renderProjects(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return [{ t: 'err', v: 'projects.json is empty or invalid.' }];
  }
  const lines = [];
  data.forEach((item, idx) => {
    if (idx > 0) lines.push({ t: 'comment', v: '' });
    lines.push({ t: 'path', v: `[${idx + 1}] ${item.title}` });
    if (item.category) lines.push({ t: 'comment', v: `    category: ${item.category}` });
    if (item.stack) lines.push({ t: 'comment', v: `    stack:    ${item.stack}` });
    if (item.link) lines.push({ t: 'comment', v: `    link:     ${item.link}` });
    if (item.description) {
      item.description.split('\n').forEach(line => {
        if (line.trim()) lines.push({ t: 'out', v: `    ${line.trim()}` });
      });
    }
  });
  return lines;
}

// Render coursework entries from JSON
function renderCoursework(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return [{ t: 'err', v: 'coursework.json is empty or invalid.' }];
  }
  const lines = [{ t: 'out', v: 'Relevant Coursework:' }];
  data.forEach((item) => {
    if (typeof item === 'string') {
      lines.push({ t: 'path', v: `  ├── ${item}` });
    } else {
      lines.push({ t: 'path', v: `  ├── ${item.title || item.name || JSON.stringify(item)}` });
      if (item.description) lines.push({ t: 'comment', v: `  │     ${item.description}` });
    }
  });
  return lines;
}

// Fuzzy/prefix match
function matchCommands(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return COMMAND_LIST.filter(cmd => {
    if (cmd.startsWith(q)) return true;
    // fuzzy: all chars of query appear in order in cmd
    let ci = 0;
    for (let i = 0; i < cmd.length && ci < q.length; i++) {
      if (cmd[i] === q[ci]) ci++;
    }
    return ci === q.length;
  }).slice(0, 8);
}

const INITIAL_LINES = [
  { t: 'out', v: 'Welcome to raihan\'s portfolio.' },
  { t: 'comment', v: 'Type help to see available commands.' },
  { t: 'comment', v: '' },
  { t: 'prompt', cmd: 'whoami' },
  ...staticCommands.whoami(),
  { t: 'comment', v: '' },
  { t: 'comment', v: 'type `help` to explore' },
];

const Terminal = () => {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [jsonData, setJsonData] = useState({ experience: null, projects: null, coursework: null });
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Load JSON files on mount
  useEffect(() => {
    const load = async (path, key) => {
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setJsonData(prev => ({ ...prev, [key]: data }));
      } catch (e) {
        console.warn(`Failed to load ${path}:`, e.message);
        setJsonData(prev => ({ ...prev, [key]: [] }));
      }
    };
    load('/data/experiences.json', 'experience');
    load('/data/projects.json', 'projects');
    load('/data/coursework.json', 'coursework');
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Update suggestions as input changes
  useEffect(() => {
    const trimmed = input.trimStart();
    // Only suggest if it looks like the first token (no space yet, or just started)
    const firstToken = trimmed.split(' ')[0];
    if (!trimmed || trimmed.includes(' ')) {
      setSuggestions([]);
    } else {
      const matches = matchCommands(firstToken);
      setSuggestions(matches);
      setSelectedSuggestion(0);
    }
  }, [input]);

  const appendLines = (newLines) => {
    setLines(prev => [...prev, ...newLines]);
  };

  const runCommand = (raw) => {
    const cmd = raw.trim();
    setSuggestions([]);
    if (!cmd) return;

    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);

    const newLines = [{ t: 'prompt', cmd }];
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setLines([]);
      return;
    }

    if (lower.startsWith('echo ')) {
      newLines.push({ t: 'out', v: cmd.slice(5) });
    } else if (lower.startsWith('cat ')) {
      const file = cmd.slice(4).trim();
      const data = catFiles[file];
      if (data) newLines.push(...data);
      else newLines.push({ t: 'err', v: `cat: ${file}: No such file or directory` });
    } else if (lower.startsWith('sudo ')) {
      const msgs = [
        'Nice try.',
        '[sudo] password for raihan:\nraihan is not in the sudoers file. This incident will be reported.',
        'Error: insufficient caffeine to grant sudo access.',
        'sudo: command not found (just kidding, you\'re not root)',
      ];
      newLines.push({ t: 'err', v: msgs[Math.floor(Math.random() * msgs.length)] });
    } else if (lower === 'pwd') {
      newLines.push({ t: 'out', v: '/home/raihan' });
    } else if (lower === 'cd' || lower.startsWith('cd ')) {
      newLines.push({ t: 'comment', v: 'you\'re already home.' });
    } else if (lower === 'man') {
      newLines.push({ t: 'err', v: 'What manual page do you want? Try `help`.' });
    } else if (lower === 'experience') {
      if (jsonData.experience === null) {
        newLines.push({ t: 'comment', v: 'loading experience.json...' });
      } else {
        newLines.push(...renderExperience(jsonData.experience));
      }
    } else if (lower === 'projects') {
      if (jsonData.projects === null) {
        newLines.push({ t: 'comment', v: 'loading projects.json...' });
      } else {
        newLines.push(...renderProjects(jsonData.projects));
      }
    } else if (lower === 'coursework') {
      if (jsonData.coursework === null) {
        newLines.push({ t: 'comment', v: 'loading coursework.json...' });
      } else {
        newLines.push(...renderCoursework(jsonData.coursework));
      }
    } else if (staticCommands[lower]) {
      newLines.push(...staticCommands[lower]());
    } else {
      newLines.push({ t: 'err', v: `bash: ${cmd.split(' ')[0]}: command not found (try \`help\`)` });
    }

    setLines(prev => [...prev, ...newLines]);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(i => (i + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(i => (i - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab' || e.key === 'Enter') {
        if (e.key === 'Tab') e.preventDefault();
        if (e.key === 'Enter' && suggestions[selectedSuggestion] !== input.trim()) {
          // Tab completes; Enter runs if exact match, otherwise completes
          if (e.key === 'Tab' || input.trim() !== suggestions[selectedSuggestion]) {
            e.preventDefault();
            setInput(suggestions[selectedSuggestion]);
            setSuggestions([]);
            return;
          }
        }
      }
      if (e.key === 'Escape') {
        setSuggestions([]);
        return;
      }
    }

    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp' && suggestions.length === 0) {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown' && suggestions.length === 0) {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(cmdHistory[next] ?? '');
      }
    }
  };

  const fontSize = isMobile ? '13px' : '16px';

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        fontFamily: 'Consolas, "Courier New", monospace',
        cursor: 'text',
      }}
    >
      {/* Title bar */}
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid #3a3a3a',
        flexShrink: 0,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ color: '#888', fontSize: '13px', margin: '0 auto' }}>raihan@uc: ~</span>
      </div>

      {/* Output area */}
      <div style={{
        flex: 1,
        padding: isMobile ? '16px 12px' : '24px',
        overflowY: 'auto',
      }}>
        {lines.map((line, i) => {
          if (line.t === 'prompt') {
            return (
              <div key={i} style={{ fontSize, lineHeight: '1.6', marginTop: '4px' }}>
                <span style={{ color: '#4ecdc4' }}>raihan@uc:~$</span>{' '}
                <span style={{ color: '#fff' }}>{line.cmd}</span>
              </div>
            );
          }
          return (
            <div key={i} style={{
              fontSize,
              lineHeight: '1.6',
              color: COLORS[line.t] ?? '#fff',
              whiteSpace: 'pre-wrap',
            }}>
              {line.v}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input row + autocomplete */}
      <div style={{ flexShrink: 0, position: 'relative' }}>
        {/* Autocomplete popup */}
        {suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: isMobile ? '12px' : '24px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '6px',
            overflow: 'hidden',
            zIndex: 10,
            minWidth: '200px',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.4)',
          }}>
            {suggestions.map((s, i) => (
              <div
                key={s}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setInput(s);
                  setSuggestions([]);
                  inputRef.current?.focus();
                }}
                style={{
                  padding: '7px 14px',
                  fontSize: '14px',
                  color: i === selectedSuggestion ? '#1a1a1a' : '#00ff00',
                  backgroundColor: i === selectedSuggestion ? '#00ff00' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'Consolas, monospace',
                  borderBottom: i < suggestions.length - 1 ? '1px solid #333' : 'none',
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '10px 12px' : '12px 24px',
          borderTop: '1px solid #2d2d2d',
          backgroundColor: '#1a1a1a',
        }}>
          <span style={{
            color: '#4ecdc4',
            fontFamily: 'Consolas, monospace',
            fontSize,
            whiteSpace: 'nowrap',
          }}>
            raihan@uc:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              flex: 1,
              marginLeft: '8px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontFamily: 'Consolas, "Courier New", monospace',
              fontSize,
              caretColor: '#00ff00',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;