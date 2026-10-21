import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  loadPosts, loadPostBody, findPost, renderMarkdown, readingTime, formatDate, KINDS, kindOf,
} from '../hooks/useBlog';

const COMMAND_LIST = [
  'help', 'whoami', 'bio', 'skills', 'interests', 'projects',
  'contact', 'education', 'music', 'ls', 'date', 'clear',
  'uname -a', 'neofetch', 'fortune', 'sudo', 'echo', 'cat',
  'pwd', 'cd', 'experience', 'coursework', 'blog',
];

const COLORS = {
  out: '#00ff00',
  err: '#ff5252',
  path: '#ffab40',
  comment: '#666',
};

// ─── Card Component ───────────────────────────────────────────────────────────

const CardPaginator = ({ data, renderCard }) => {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{
      border: '1px solid #333', borderRadius: 6, padding: '12px 14px',
      margin: '4px 0', background: '#222',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <button
          disabled={idx === 0}
          onClick={() => setIdx(i => i - 1)}
          style={navBtnStyle}
        >&lt; prev</button>
        <button
          disabled={idx === data.length - 1}
          onClick={() => setIdx(i => i + 1)}
          style={navBtnStyle}
        >next &gt;</button>
        <span style={{ color: '#666', fontSize: 12, fontFamily: 'Consolas, monospace' }}>
          {idx + 1} / {data.length}
        </span>
      </div>
      {renderCard(data[idx])}
    </div>
  );
};

const navBtnStyle = {
  background: '#2d2d2d', border: '1px solid #444', borderRadius: 4,
  color: '#00ff00', fontFamily: 'Consolas, monospace', fontSize: 12,
  padding: '2px 8px', cursor: 'pointer', lineHeight: 1.6,
};

const ExperienceCard = ({ item }) => (
  <div>
    <div style={{ color: '#ffab40', fontSize: 14, fontFamily: 'Consolas, monospace', fontWeight: 'bold', marginBottom: 2 }}>
      {item.title} — {item.organization}
    </div>
    <div style={{ color: '#888', fontSize: 12, fontFamily: 'Consolas, monospace', marginBottom: 6 }}>
      {item.date}
    </div>
    {item.description && item.description.split('\n').map((line, i) => (
      <div key={i} style={{ color: '#00ff00', fontSize: 13, fontFamily: 'Consolas, monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {line}
      </div>
    ))}
    {item.link && (
      <a href={item.link} target="_blank" rel="noreferrer"
        style={{ color: '#4ecdc4', fontSize: 13, fontFamily: 'Consolas, monospace', display: 'block', marginTop: 6 }}>
        {item.link}
      </a>
    )}
  </div>
);

const ProjectCard = ({ item }) => {
  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    if (!enlarged) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setEnlarged(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [enlarged]);

  return (
  <div>
    <div style={{ color: '#ffab40', fontSize: 14, fontFamily: 'Consolas, monospace', fontWeight: 'bold', marginBottom: 4 }}>
      {item.title}
    </div>
    <div style={{ marginBottom: 6 }}>
      {item.category && <Tag>{item.category}</Tag>}
      {item.stack && item.stack.split(',').map(s => <Tag key={s}>{s.trim()}</Tag>)}
    </div>
    {item.screenshot && (
      <div style={{ margin: '8px 0', textAlign: 'left' }}>
        <img
          src={item.screenshot}
          alt={`${item.title} screenshot — click to enlarge`}
          title="Click to enlarge"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          onClick={(e) => { e.stopPropagation(); setEnlarged(true); }}
          style={{
            display: 'block',
            maxWidth: '320px',
            width: '100%',
            maxHeight: '200px',
            objectFit: 'cover',
            border: '1px solid #444',
            borderRadius: '4px',
            backgroundColor: '#333',
            cursor: 'zoom-in',
          }}
        />
      </div>
    )}
    {item.description && item.description.split('\n').map((line, i) => (
      <div key={i} style={{ color: '#00ff00', fontSize: 13, fontFamily: 'Consolas, monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {line}
      </div>
    ))}
    {item.link && (
      <a href={item.link} target="_blank" rel="noreferrer"
        style={{ color: '#4ecdc4', fontSize: 13, fontFamily: 'Consolas, monospace', display: 'block', marginTop: 6 }}>
        {item.link}
      </a>
    )}
    {enlarged && item.screenshot && (
      <div
        onClick={(e) => { e.stopPropagation(); setEnlarged(false); }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          padding: '20px',
          cursor: 'zoom-out',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '85vh',
            backgroundColor: '#222',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <button
            onClick={() => setEnlarged(false)}
            aria-label="Close image"
            style={{
              position: 'absolute',
              top: '6px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '22px',
              cursor: 'pointer',
            }}
          >
            ✖
          </button>
          <img
            src={item.screenshot}
            alt={`${item.title} screenshot full size`}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            style={{
              display: 'block',
              maxWidth: '86vw',
              maxHeight: '70vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '6px',
            }}
          />
          <div style={{ color: '#00ff00', textAlign: 'center', marginTop: '8px', fontSize: 13, fontFamily: 'Consolas, monospace' }}>
            {item.title} — esc or click outside to close
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

const CourseworkCard = ({ item }) => (
  <div>
    <div style={{ color: '#ffab40', fontSize: 14, fontFamily: 'Consolas, monospace', fontWeight: 'bold', marginBottom: 4 }}>
      {typeof item === 'string' ? item : (item.title || item.name || JSON.stringify(item))}
    </div>
    {item.description && item.description.split('\n').map((line, i) => (
      <div key={i} style={{ color: '#00ff00', fontSize: 13, fontFamily: 'Consolas, monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {line}
      </div>
    ))}
  </div>
);

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-block', background: '#2d2d2d', border: '1px solid #444',
    borderRadius: 3, color: '#ffab40', fontSize: 11, padding: '1px 6px',
    margin: '2px 2px 0 0', fontFamily: 'Consolas, monospace',
  }}>
    {children}
  </span>
);

// ─── Blog ─────────────────────────────────────────────────────────────────────

const mono = { fontFamily: 'Consolas, monospace' };

const blogLinkStyle = {
  ...mono, background: 'none', border: 'none', padding: 0, cursor: 'pointer',
  color: COLORS.out, fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 3,
};

const BlogList = ({ posts, filter, onOpen }) => (
  <div style={{ ...mono, margin: '4px 0' }}>
    <div style={{ color: COLORS.comment, fontSize: 13, marginBottom: 4 }}>
      total {posts.length}{filter ? ` (${KINDS[filter].plural} only)` : ''}
    </div>
    {posts.map((p) => (
      <div key={p.slug} style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
        <span style={{ color: '#888' }}>{p.date || '----------'}  </span>
        <span style={{ color: KINDS[kindOf(p)].color }}>
          {KINDS[kindOf(p)].short}{'  '}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(p.slug); }}
          style={blogLinkStyle}
          title={`blog ${p.slug}`}
        >
          {p.slug}.md
        </button>
        <span style={{ color: '#fff' }}>{'  '}{p.title}</span>
      </div>
    ))}
    <div style={{ color: COLORS.comment, fontSize: 13, marginTop: 6 }}>
      click a file, or run `blog &lt;slug&gt;` / `blog &lt;n&gt;` to read · {Object.values(KINDS).map((k) => `blog ${k.flag}`).join(' · ')}
    </div>
  </div>
);

const BlogPostView = ({ post, body }) => (
  <div style={{
    ...mono, border: '1px solid #333', borderRadius: 6, padding: '12px 14px',
    margin: '4px 0', background: '#222', maxWidth: 820,
  }}>
    <div style={{ color: COLORS.path, fontSize: 16, fontWeight: 'bold' }}>{post.title}</div>
    <div style={{ color: '#888', fontSize: 12, margin: '2px 0 6px' }}>
      {KINDS[kindOf(post)].label} · {formatDate(post.date)}
      {body ? ` · ${readingTime(body)} min read` : ''}
      {post.venue ? ` · ${post.venue}` : ''}
    </div>
    {post.tags?.length > 0 && <div style={{ marginBottom: 6 }}>{post.tags.map((t) => <Tag key={t}>#{t}</Tag>)}</div>}
    {post.authors && <div style={{ color: '#bbb', fontSize: 13 }}>authors: {post.authors}</div>}
    {post.link && (
      <a href={post.link} target="_blank" rel="noreferrer"
        style={{ color: '#4ecdc4', fontSize: 13, display: 'block', marginTop: 4 }}>
        {post.link}
      </a>
    )}
    {body ? (
      // Post markdown is authored by the site owner, so it's trusted.
      <div className="gui-prose term-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
    ) : (
      !post.link && <div style={{ color: COLORS.comment, fontSize: 13, marginTop: 8 }}>(this post is still being written)</div>
    )}
    <div style={{ color: COLORS.comment, fontSize: 12, marginTop: 10 }}>
      -- end of file -- ·{' '}
      <Link to={`/blog/${post.slug}`} style={{ color: '#4ecdc4' }} onClick={(e) => e.stopPropagation()}>
        open in UI view
      </Link>
    </div>
  </div>
);

// ─── Link rendering helper ────────────────────────────────────────────────────

// Renders a line value that may contain HTML anchor tags (set via raw HTML lines)
const LineContent = ({ value }) => {
  if (value && value.includes('<a ')) {
    return <span dangerouslySetInnerHTML={{ __html: value }} />;
  }
  return <>{value}</>;
};

// ─── Static command definitions ───────────────────────────────────────────────

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
    { t: 'path', v: '  blog        → publications, articles & notes' },
    { t: 'path', v: '  blog <n>    → read a post (number or slug)' },
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
    { t: 'out', v: 'senior year cs @ university of cincinnati' },
    { t: 'out', v: 'ex-product intern @ Benchmark Gensuite. 2x intern @ Idaho National Laboratory. NEXT innovation scholar.' },
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
    { t: 'out', v: 'GitHub:    <a href="https://github.com/raihanrafeek" target="_blank" rel="noreferrer">github.com/raihanrafeek</a>' },
    { t: 'out', v: 'LinkedIn:  <a href="https://linkedin.com/in/raihanrafeek" target="_blank" rel="noreferrer">linkedin.com/in/raihanrafeek</a>' },
    { t: 'out', v: 'Email:     <a href="mailto:rafeek.rn@mail.uc.edu">rafeek.rn@mail.uc.edu</a>' },
    { t: 'comment', v: '(or just catch me on campus)' },
  ],
  education: () => [
    { t: 'path', v: 'university of cincinnati' },
    { t: 'out', v: '  undergrad computer science — senior year' },
    { t: 'out', v: '  focus: very focused... jk i like ai/nlp/ml/backend+infra' },
    { t: 'out', v: '  GPA: 3.97' },
    { t: 'comment', v: 'i have a life, i swear' },
  ],
  music: () => [
    { t: 'out', v: 'currently listening to:' },
    { t: 'path', v: '  ├── periphery — luck as a constant' },
    { t: 'path', v: '  ├── thirty seconds to mars — the kill' },
    { t: 'path', v: '  ├── eric clapton — bad love' },
    { t: 'path', v: '  └── skrillex — soma' },
    { t: 'comment', v: 'Genre: "yes"' },
  ],
  ls: () => [
    { t: 'out', v: 'bio.txt         projects.md     skills.json' },
    { t: 'out', v: 'interests/      music/          contact.txt' },
    { t: 'out', v: 'resume.pdf      .secrets        .bashrc' },
    { t: 'out', v: 'experience.json projects.json   coursework.json' },
    { t: 'out', v: 'blog/' },
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
  'experience.json': [{ t: 'comment', v: 'tip: run `experience` for the card view' }],
  'projects.json': [{ t: 'comment', v: 'tip: run `projects` for the card view' }],
  'coursework.json': [{ t: 'comment', v: 'tip: run `coursework` for the card view' }],
};

// ─── Fuzzy match ──────────────────────────────────────────────────────────────

function matchCommands(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return COMMAND_LIST.filter(cmd => {
    if (cmd.startsWith(q)) return true;
    let ci = 0;
    for (let i = 0; i < cmd.length && ci < q.length; i++) {
      if (cmd[i] === q[ci]) ci++;
    }
    return ci === q.length;
  }).slice(0, 8);
}

// ─── Initial output ───────────────────────────────────────────────────────────

const INITIAL_LINES = [
  { t: 'out', v: 'Welcome to raihan\'s portfolio.' },
  { t: 'comment', v: 'Type help to see available commands.' },
  { t: 'comment', v: '' },
  { t: 'prompt', cmd: 'whoami' },
  ...staticCommands.whoami(),
  { t: 'comment', v: '' },
  { t: 'comment', v: 'type `help` to explore' },
];

// ─── Main Terminal ────────────────────────────────────────────────────────────

const Terminal = () => {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [jsonData, setJsonData] = useState({ experience: null, projects: null, coursework: null });
  const [posts, setPosts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pendingRun = useRef(searchParams.get('run'));
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

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
    loadPosts().then(setPosts).catch((e) => {
      console.warn('Failed to load /data/blog.json:', e.message);
      setPosts([]);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    const trimmed = input.trimStart();
    if (!trimmed || trimmed.includes(' ')) {
      setSuggestions([]);
    } else {
      const matches = matchCommands(trimmed.split(' ')[0]);
      setSuggestions(matches);
      setSelectedSuggestion(0);
    }
  }, [input]);

  // Remember the blog view in the URL so the UI toggle can land on the same post.
  const syncBlogParam = (slug) => {
    setSearchParams({ run: slug ? `blog ${slug}` : 'blog' }, { replace: true });
  };

  const runBlog = (arg, promptLine) => {
    if (posts === null) {
      setLines(prev => [...prev, promptLine, { t: 'comment', v: 'loading blog.json... try again in a sec' }]);
      return;
    }
    const filter = Object.keys(KINDS).find(k => KINDS[k].flag === arg);
    if (!arg || filter) {
      const list = filter ? posts.filter(p => kindOf(p) === filter) : posts;
      setLines(prev => [...prev, promptLine, list.length
        ? { t: 'blog-list', posts: list, filter }
        : { t: 'comment', v: 'nothing here yet — check back soon.' }]);
      syncBlogParam();
      return;
    }
    const post = findPost(posts, arg);
    if (!post) {
      setLines(prev => [...prev, promptLine, { t: 'err', v: `blog: ${arg}: no such post (run \`blog\` to list)` }]);
      return;
    }
    setLines(prev => [...prev, promptLine]);
    syncBlogParam(post.slug);
    loadPostBody(post.slug)
      .catch(() => null)
      .then(body => setLines(prev => [...prev, { t: 'blog-post', post, body }]));
  };

  const runCommand = (raw) => {
    const cmd = raw.trim();
    setSuggestions([]);
    if (!cmd) return;

    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setLines([]);
      return;
    }

    const promptLine = { t: 'prompt', cmd };

    // Card commands — append a special card line type
    if (lower === 'experience') {
      const data = jsonData.experience;
      if (data === null) {
        setLines(prev => [...prev, promptLine, { t: 'comment', v: 'loading experience.json...' }]);
      } else {
        setLines(prev => [...prev, promptLine, { t: 'card', cardType: 'experience', data }]);
      }
      return;
    }
    if (lower === 'projects') {
      const data = jsonData.projects;
      if (data === null) {
        setLines(prev => [...prev, promptLine, { t: 'comment', v: 'loading projects.json...' }]);
      } else {
        setLines(prev => [...prev, promptLine, { t: 'card', cardType: 'projects', data }]);
      }
      return;
    }
    if (lower === 'coursework') {
      const data = jsonData.coursework;
      if (data === null) {
        setLines(prev => [...prev, promptLine, { t: 'comment', v: 'loading coursework.json...' }]);
      } else {
        setLines(prev => [...prev, promptLine, { t: 'card', cardType: 'coursework', data }]);
      }
      return;
    }

    if (lower === 'blog' || lower.startsWith('blog ')) {
      runBlog(cmd.slice(4).trim(), promptLine);
      return;
    }
    if (lower.startsWith('cat blog/')) {
      runBlog(cmd.slice(9).trim(), promptLine);
      return;
    }
    if (['ls blog', 'ls blog/', 'cd blog', 'cd blog/'].includes(lower)) {
      runBlog('', promptLine);
      return;
    }

    let newLines = [promptLine];

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
    } else if (staticCommands[lower]) {
      newLines.push(...staticCommands[lower]());
    } else {
      newLines.push({ t: 'err', v: `bash: ${cmd.split(' ')[0]}: command not found (try \`help\`)` });
    }

    setLines(prev => [...prev, ...newLines]);
  };

  // Replay a command handed over via /terminal?run=... once the posts load.
  useEffect(() => {
    if (pendingRun.current && posts !== null) {
      const cmd = pendingRun.current;
      pendingRun.current = null;
      runCommand(cmd);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

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
      if (e.key === 'Tab') {
        e.preventDefault();
        setInput(suggestions[selectedSuggestion]);
        setSuggestions([]);
        return;
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
          // Card lines
          if (line.t === 'card') {
            const { cardType, data } = line;
            if (!data || data.length === 0) {
              return (
                <div key={i} style={{ fontSize, color: COLORS.err }}>
                  {cardType}.json is empty or invalid.
                </div>
              );
            }
            if (cardType === 'experience') {
              return (
                <CardPaginator
                  key={i}
                  data={data}
                  renderCard={(item) => <ExperienceCard item={item} />}
                />
              );
            }
            if (cardType === 'projects') {
              return (
                <CardPaginator
                  key={i}
                  data={data}
                  renderCard={(item) => <ProjectCard item={item} />}
                />
              );
            }
            if (cardType === 'coursework') {
              return (
                <CardPaginator
                  key={i}
                  data={data}
                  renderCard={(item) => <CourseworkCard item={item} />}
                />
              );
            }
          }

          if (line.t === 'blog-list') {
            return (
              <BlogList
                key={i}
                posts={line.posts}
                filter={line.filter}
                onOpen={(slug) => runCommand(`blog ${slug}`)}
              />
            );
          }
          if (line.t === 'blog-post') {
            return <div key={i} style={{ fontSize }}><BlogPostView post={line.post} body={line.body} /></div>;
          }

          // Prompt lines
          if (line.t === 'prompt') {
            return (
              <div key={i} style={{ fontSize, lineHeight: '1.6', marginTop: '4px' }}>
                <span style={{ color: '#4ecdc4' }}>raihan@uc:~$</span>{' '}
                <span style={{ color: '#fff' }}>{line.cmd}</span>
              </div>
            );
          }

          // Regular text lines (may contain anchor tags)
          return (
            <div key={i} style={{
              fontSize,
              lineHeight: '1.6',
              color: COLORS[line.t] ?? '#fff',
              whiteSpace: 'pre-wrap',
            }}>
              <LineContent value={line.v} />
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input row + autocomplete */}
      <div style={{ flexShrink: 0, position: 'relative' }}>
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