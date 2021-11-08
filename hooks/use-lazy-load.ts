import { useEffect } from "react";

// based on https://web.dev/lazy-loading-video/ but simplified quite a bit
export const useLazyLoad = (selector: string) => {
  useEffect(() => {
    const lazyVideos = [...document.querySelectorAll(selector)];

    const lazyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const video = entry.target as HTMLVideoElement;

        if (video.src) return;
        const src = video.getAttribute("data-src");
        if (!src) return;
        video.src = src;
        // video.autoplay = true
        video.play();
      });
    });

    lazyVideos.forEach((video) => lazyVideoObserver.observe(video));

    return () => {
      lazyVideoObserver.disconnect();
    };
  }, [selector]);
};
