import { useEffect, useState } from 'react';
import { marked } from 'marked';

// Posts are indexed in /data/blog.json; each post's body lives in
// /posts/<slug>.md (optional for publications that only link out).

// Post types, in filter order. `short` is the 4-char tag in the terminal list;
// `chip`/`color` style the type badge in the UI and terminal.
export const KINDS = {
  publication: { label: 'publication', plural: 'publications', flag: '--pubs', short: 'pub ', chip: '', color: '#ffab40' },
  article: { label: 'article', plural: 'articles', flag: '--articles', short: 'art ', chip: 'green', color: '#00ff00' },
  note: { label: 'note', plural: 'notes', flag: '--notes', short: 'note', chip: 'cyan', color: '#4ecdc4' },
};

// Posts without a (known) kind are treated as notes.
export const kindOf = (post) => (KINDS[post?.kind] ? post.kind : 'note');

export const sortPosts = (posts) =>
  [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

export const loadPosts = async () => {
  const res = await fetch('/data/blog.json');
  if (!res.ok) throw new Error(`HTTP ${res.status} for /data/blog.json`);
  const data = await res.json();
  return Array.isArray(data) ? sortPosts(data) : [];
};

// Resolves to the markdown string, or null if the post has no body file.
export const loadPostBody = async (slug) => {
  const res = await fetch(`/posts/${encodeURIComponent(slug)}.md`);
  if (!res.ok) return null;
  const text = await res.text();
  // SPA hosts may answer unknown paths with index.html instead of a 404.
  if (/^\s*<!doctype html/i.test(text)) return null;
  return text;
};

// Posts are authored by the site owner, so the HTML is trusted as-is.
export const renderMarkdown = (md) => marked.parse(md || '');

export const readingTime = (md) => {
  const words = (md || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const findPost = (posts, key) => {
  if (!posts || !key) return null;
  const n = Number(key);
  if (Number.isInteger(n) && n >= 1 && n <= posts.length) return posts[n - 1];
  return posts.find((p) => p.slug === key.replace(/\.md$/, '')) || null;
};

// Terminal URL that replays the matching blog command, e.g. /terminal?run=blog%20foo
export const blogTerminalPath = (slug) =>
  `/terminal?run=${encodeURIComponent(slug ? `blog ${slug}` : 'blog')}`;

export const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadPosts()
      .then((p) => { if (!cancelled) setPosts(p); })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
          setPosts([]);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { posts, error };
};

// body: undefined while loading, null when the post has no .md file.
export const usePostBody = (slug) => {
  const [body, setBody] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    setBody(undefined);
    loadPostBody(slug)
      .then((b) => { if (!cancelled) setBody(b); })
      .catch(() => { if (!cancelled) setBody(null); });
    return () => { cancelled = true; };
  }, [slug]);

  return body;
};
