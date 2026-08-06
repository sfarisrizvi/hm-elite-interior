"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  end?: string;
}

/**
 * Reusable hook for scroll-triggered reveal animations.
 * Element enters from bottom 30% of viewport, stays visible,
 * and exits through top 30%.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      duration = 1,
      delay = 0,
      ease = "power3.out",
      start = "top 90%",
      end = "top 60%",
    } = options;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(el, { y, x, opacity: 0 });

      // Entrance animation
      ScrollTrigger.create({
        trigger: el,
        start,
        end,
        onEnter: () => {
          gsap.to(el, {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease,
          });
        },
        onLeaveBack: () => {
          gsap.to(el, {
            y,
            x,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [options.y, options.x, options.duration, options.delay, options.ease, options.start, options.end]);

  return ref;
}

/**
 * Component wrapper for reveal-on-scroll.
 */
export function RevealOnScroll({
  children,
  className = "",
  as: Component = "div",
  y = 60,
  delay = 0,
  duration = 1,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  y?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRevealOnScroll<HTMLDivElement>({ y, delay, duration });

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
