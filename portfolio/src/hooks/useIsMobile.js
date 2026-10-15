import { useEffect, useState } from 'react';

export const MOBILE_BREAKPOINT = 768;
const MOBILE_UA = /Mobi|Android|iPhone|iPad|iPod|Mobile/i;

export const isMobileDevice = (breakpoint = MOBILE_BREAKPOINT) => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  try {
    if (MOBILE_UA.test(navigator.userAgent || '')) return true;
  } catch {
    /* ignore UA errors */
  }
  return window.innerWidth <= breakpoint;
};

const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(() => isMobileDevice(breakpoint));

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileDevice(breakpoint));
    window.addEventListener('resize', onResize);
    // Re-check once after mount in case UA/innerWidth settled late.
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
