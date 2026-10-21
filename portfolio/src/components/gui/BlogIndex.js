import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopNav from './TopNav';
import {
  usePosts, formatDate, blogTerminalPath, KINDS, kindOf,
} from '../../hooks/useBlog';

export const BLOG_LINKS = [
  { label: '~ home', to: '/' },
  { label: 'experiences', to: '/#experiences' },
  { label: 'projects', to: '/#projects' },
  { label: 'blog', to: '/blog' },
];

const FILTERS = [
  { key: 'all', label: 'all' },
  ...Object.entries(KINDS).map(([key, k]) => ({ key, label: k.plural })),
];

export const PostMeta = ({ post, minutes }) => (
  <div className="gui-post-meta">
    <span className={`gui-chip ${KINDS[kindOf(post)].chip}`}>{KINDS[kindOf(post)].label}</span>
    <span>{formatDate(post.date)}</span>
    {minutes && <span>· {minutes} min read</span>}
    {post.venue && <span>· {post.venue}</span>}
  </div>
);

const BlogIndex = () => {
  const { posts } = usePosts();
  const [params, setParams] = useSearchParams();
  const kind = params.get('kind') || 'all';
  const tag = params.get('tag');

  const setFilter = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    setParams(p, { replace: true });
  };

  const visible = (posts || []).filter((p) =>
    (kind === 'all' || kindOf(p) === kind) && (!tag || p.tags?.includes(tag))
  );
  const countFor = (k) => (posts || []).filter((p) => k === 'all' || kindOf(p) === k).length;

  return (
    <div className="gui-root">
      <div className="gui-inner">
        <TopNav links={BLOG_LINKS} terminalTo={blogTerminalPath()} />

        <section className="gui-section" style={{ marginTop: 28 }} aria-label="blog">
          <div className="gui-section-head glass-strong">
            <div className="gui-section-title">
              <span className="prompt">raihan@uc:~$</span> <span>ls ~/blog</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 15 }}>
              <span className="gui-orange" style={{ fontWeight: 'bold' }}>➤ blog</span>
            </div>
            <div className="gui-section-sub">
              publications, reflection pieces, and smaller notes on things i read, try out, and think about
            </div>
            <div className="gui-filter-row" role="group" aria-label="Filter posts">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`gui-filter${kind === f.key ? ' active' : ''}`}
                  aria-pressed={kind === f.key}
                  onClick={() => setFilter({ kind: f.key === 'all' ? null : f.key })}
                >
                  {f.label} <span className="gui-muted">({countFor(f.key)})</span>
                </button>
              ))}
              {tag && (
                <button className="gui-filter active" onClick={() => setFilter({ tag: null })} aria-label={`Clear tag ${tag}`}>
                  #{tag} ✕
                </button>
              )}
            </div>
          </div>

          {posts === null && <div className="gui-state glass">loading blog…</div>}
          {posts && visible.length === 0 && (
            <div className="gui-state glass">nothing here yet — check back soon.</div>
          )}

          <div className="gui-post-list">
            {visible.map((post) => (
              <article key={post.slug} className="gui-post-row glass">
                <PostMeta post={post} />
                <Link className="gui-post-title" to={`/blog/${post.slug}`}>{post.title}</Link>
                {post.summary && <p className="gui-post-summary">{post.summary}</p>}
                {post.tags?.length > 0 && (
                  <div className="gui-chip-row" style={{ marginBottom: 0 }}>
                    {post.tags.map((t) => (
                      <button key={t} className="gui-chip gui-tag" onClick={() => setFilter({ tag: t })}>#{t}</button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogIndex;
