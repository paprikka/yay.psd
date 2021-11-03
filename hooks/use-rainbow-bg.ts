import { useEffect } from "react";

export const useRainbowBg = () =>
  useEffect(() => {
    const cb = () => {
      const viewportHeight = window.innerHeight;
      const contentHeight = document.body.getBoundingClientRect().height;
      const viewportsPerRotation = Math.min(3, contentHeight / viewportHeight);
      const from = 51;
      const to = 219;
      const progress = window.scrollY / (viewportHeight * viewportsPerRotation);

      const h = from + (to - from) * progress;
      document.body.style.backgroundColor = `hsl(${h}deg 100% 50%)`;
    };
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  });
