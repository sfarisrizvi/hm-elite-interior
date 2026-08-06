"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Showreel section: video frame starts small, scales to full viewport on scroll.
 */
export function Showreel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const ctx = gsap.context(() => {
      // Scale the video frame from small card to full viewport
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "top -10%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 0.5 + progress * 0.5;
          const radius = 24 * (1 - progress);
          const width = 70 + progress * 30;

          frame.style.transform = `scale(${scale})`;
          frame.style.borderRadius = `${radius}px`;
          frame.style.width = `${width}%`;
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
        overflow: "hidden",
      }}
    >
      <div
        ref={frameRef}
        style={{
          position: "relative",
          width: "70%",
          aspectRatio: "16/9",
          borderRadius: 24,
          overflow: "hidden",
          transform: "scale(0.5)",
          background: "var(--surface-elevated)",
          border: "1px solid var(--border-subtle)",
          margin: "0 auto",
        }}
      >
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src="/video-compressed.mp4"
          poster="/images/living-room/living-2.jpg"
          playsInline
          loop
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
          }}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Video Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isPlaying ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.45)",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause craft video" : "Play craft video"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "var(--accent)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 40px rgba(196, 139, 105, 0.4)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translate(-50%, -50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translate(-50%, -50%) scale(1)";
          }}
        >
          {isPlaying ? (
            <Pause size={28} color="#FFFFFF" />
          ) : (
            <Play size={28} color="#FFFFFF" style={{ marginLeft: 4 }} />
          )}
        </button>

        {/* Label */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 32,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 8,
            }}
          >
            Showreel 2024
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Watch Our Craft
          </div>
        </div>
      </div>
    </section>
  );
}
