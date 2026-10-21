import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import TopNav from './TopNav';
import { BLOG_LINKS, PostMeta } from './BlogIndex';
import {
  usePosts, usePostBody, renderMarkdown, readingTime, blogTerminalPath,
} from '../../hooks/useBlog';

const BlogPost = () => {
  const { slug } = useParams();
  const { posts } = usePosts();
  const body = usePostBody(slug);
  const html = useMemo(() => (body ? renderMarkdown(body) : ''), [body]);

  const i = posts ? posts.findIndex((p) => p.slug === slug) : -1;
  const post = i >= 0 ? posts[i] : null;
  const newer = i > 0 ? posts[i - 1] : null;
  const older = i >= 0 && i < posts.length - 1 ? posts[i + 1] : null;

  useEffect(() => {
    if (!post) return undefined;
    const prev = document.title;
    document.title = `${post.title} — Raihan Rafeek`;
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, [post]);

  return (
    <div className="gui-root">
      <div className="gui-inner">
        <TopNav links={BLOG_LINKS} terminalTo={blogTerminalPath(slug)} />

        <div className="gui-post-wrap">
          <Link className="gui-card-link" to="/blog" style={{ display: 'inline-block', margin: '24px 0 14px' }}>
            cd ../blog
          </Link>

          {posts === null && <div className="gui-state glass">loading…</div>}
          {posts && !post && (
            <div className="gui-state glass">
              cat: blog/{slug}.md: No such file or directory
            </div>
          )}

          {post && (
            <article className="gui-post glass-strong">
              <div className="gui-section-title" style={{ fontSize: 14 }}>
                <span className="prompt">raihan@uc:~$</span> <span>cat blog/{slug}.md</span>
              </div>
              <h1 className="gui-post-h1">{post.title}</h1>
              <PostMeta post={post} minutes={body ? readingTime(body) : null} />
              {post.tags?.length > 0 && (
                <div className="gui-chip-row">
                  {post.tags.map((t) => (
                    <Link key={t} className="gui-chip gui-tag" to={`/blog?tag=${encodeURIComponent(t)}`}>#{t}</Link>
                  ))}
                </div>
              )}

              {post.kind === 'publication' && (post.authors || post.link) && (
                <div className="gui-pub-box">
                  {post.authors && <div><span className="gui-muted">authors:</span> {post.authors}</div>}
                  {post.venue && <div><span className="gui-muted">venue:</span> {post.venue}</div>}
                  {post.link && (
                    <a className="gui-card-link" href={post.link} target="_blank" rel="noreferrer">
                      read the paper ↗
                    </a>
                  )}
                </div>
              )}

              {body === undefined && <div className="gui-muted" style={{ marginTop: 20 }}>loading post…</div>}
              {body === null && !post.link && (
                <div className="gui-muted" style={{ marginTop: 20 }}>this post is still being written.</div>
              )}
              {html && (
                // Post markdown is authored by the site owner, so it's trusted.
                <div className="gui-prose" dangerouslySetInnerHTML={{ __html: html }} />
              )}
            </article>
          )}

          {post && (newer || older) && (
            <nav className="gui-post-pager" aria-label="More posts">
              {older ? (
                <Link className="gui-post-pager-link glass" to={`/blog/${older.slug}`}>
                  <span className="gui-muted">&lt; older</span>{older.title}
                </Link>
              ) : <span />}
              {newer && (
                <Link className="gui-post-pager-link glass" to={`/blog/${newer.slug}`} style={{ textAlign: 'right' }}>
                  <span className="gui-muted">newer &gt;</span>{newer.title}
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
