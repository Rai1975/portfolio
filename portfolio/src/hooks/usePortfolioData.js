import { useEffect, useState } from 'react';

const loadJson = async (path) => {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const usePortfolioData = () => {
  const [data, setData] = useState({ experiences: null, projects: null, coursework: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [experiences, projects, coursework] = await Promise.all([
          loadJson('/data/experiences.json'),
          loadJson('/data/projects.json'),
          loadJson('/data/coursework.json'),
        ]);
        if (!cancelled) setData({ experiences, projects, coursework });
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
          setData({ experiences: [], projects: [], coursework: [] });
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return { ...data, error };
};

export default usePortfolioData;
