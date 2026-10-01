import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollVideoHero = ({ onEnterClick }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.02 && videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const width = useTransform(scrollYProgress, [0, 1], ['40vw', '100vw']);
  const height = useTransform(scrollYProgress, [0, 1], ['40vh', '100vh']);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['24px', '0px']);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-beige-100 dark:bg-stone-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ width, height, borderRadius }}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 overflow-hidden shadow-2xl"
        >
          <motion.video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/brag.mp4" type="video/mp4" />
          </motion.video>

          {onEnterClick && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex flex-col items-center justify-end pb-12 px-6">
              <button
                type="button"
                onClick={onEnterClick}
                className="px-6 py-3 rounded-xl bg-white text-stone-900 font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
              >
                Enter Console
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollVideoHero;
