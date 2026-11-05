import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    let raf;
    const animateFollower = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animateFollower);
    };

    const handleMouseEnterLink = () => {
      cursorRef.current?.classList.add('cursor--hover');
      followerRef.current?.classList.add('cursor-follower--hover');
    };

    const handleMouseLeaveLink = () => {
      cursorRef.current?.classList.remove('cursor--hover');
      followerRef.current?.classList.remove('cursor-follower--hover');
    };

    window.addEventListener('mousemove', handleMouseMove);
    raf = requestAnimationFrame(animateFollower);

    // Hover detection on interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    addHoverListeners();
    const mo = new MutationObserver(addHoverListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

