"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Don't smooth touch scroll — native touch feels better
    });

    lenisRef.current = lenis;

    // Wire Lenis into GSAP's ticker so ScrollTrigger stays in sync
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Required: prevents ScrollTrigger from jumping on tab-switch / long frames
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts/images settle
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(refreshTimeout);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
