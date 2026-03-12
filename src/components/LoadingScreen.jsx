import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(onComplete, 800);
        }, 400);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Sedikit diperbesar dari versi sebelumnya
  const equalizerBars = [
    { min: 18, max: 32 },
    { min: 24, max: 48 },
    { min: 32, max: 64 },
    { min: 24, max: 48 },
    { min: 18, max: 32 },
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden selection:bg-none"
        >
          {/* Equalizer */}
          <div className="relative z-10 flex items-center justify-center gap-2 h-20">
            {equalizerBars.map((bar, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${bar.min}px`, `${bar.max}px`, `${bar.min}px`],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                // Dipertebal sedikit menjadi 4px (w-1) dan 5px di layar md
                className="w-1 md:w-[5px] rounded-full bg-zinc-200"
              />
            ))}
          </div>

          {/* Bottom Elements */}
          <div className="absolute bottom-16 md:bottom-20 flex flex-col items-center gap-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-300"
            >
              LOADING EXPERIENCE
            </motion.span>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;