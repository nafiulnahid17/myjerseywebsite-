import { useEffect } from 'react';
/** Source .rv reveal-on-scroll. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('v'); io.unobserve(e.target); } }), { threshold: 0.15 });
    document.querySelectorAll('.rv').forEach((x) => io.observe(x));
    return () => io.disconnect();
  }, []);
}
