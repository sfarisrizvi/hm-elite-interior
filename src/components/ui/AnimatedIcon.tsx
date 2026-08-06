"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface AnimatedIconProps {
  src: string;
  size?: number;
  className?: string;
}

export function AnimatedIcon({ src, size = 64, className }: AnimatedIconProps) {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => console.error("Lottie animation load error:", err));

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div style={{ width: size, height: size }} />
      )}
    </div>
  );
}
