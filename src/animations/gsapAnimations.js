import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Reveal text animation
export function useTextReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 1,
        ease: 'power3.out',
        delay: options.delay || 0,
        scrollTrigger: options.scrollTrigger
          ? {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          : undefined,
      }
    );
  }, [ref, options]);
}

// Stagger children animation
export function useStaggerReveal(containerRef, childSelector = '.stagger-child', options = {}) {
  useEffect(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll(childSelector);

    gsap.fromTo(
      children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        stagger: options.stagger || 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [containerRef, childSelector, options]);
}

// Scroll-triggered fade in
export function useFadeIn(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: options.y ?? 40,
        x: options.x ?? 0,
        scale: options.scale ?? 1,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: options.duration || 1,
        delay: options.delay || 0,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [ref]);
}

// Horizontal scroll
export function useHorizontalScroll(containerRef, trackRef, options = {}) {
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth - containerRef.current.offsetWidth;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
      },
    });
  }, [containerRef, trackRef]);
}

// Counter animation
export function useCounterAnimation(ref, end, options = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const counter = { value: 0 };
    gsap.to(counter, {
      value: end,
      duration: options.duration || 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(counter.value) + (options.suffix || '');
        }
      },
    });
  }, [ref, end, options]);
}

