import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxElements = () => {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative Elements - Top Left */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-20 left-10 w-32 h-32 border border-zinc-800 rounded-full opacity-30"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 left-20 w-4 h-4 bg-violet-500/20 rounded-full"
      />

      {/* Decorative Elements - Top Right */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-32 right-20 w-24 h-24 border border-zinc-700 rounded-lg rotate-45 opacity-20"
      />
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute top-60 right-10 w-2 h-2 bg-white/30 rounded-full"
      />

      {/* Decorative Elements - Middle */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
        className="absolute top-1/2 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"
      />

      {/* Decorative Elements - Bottom */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute bottom-40 right-1/3 w-16 h-16 border border-zinc-800 rounded-full opacity-20"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -250]) }}
        className="absolute bottom-20 left-20 w-3 h-3 bg-violet-400/30 rounded-full"
      />

      {/* Floating dots pattern */}
      <div className="absolute top-1/4 right-1/4 opacity-10">
        <div className="grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random(),
                delay: Math.random() * 2,
              }}
              className="w-1 h-1 bg-white rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Large background text */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute -bottom-20 -left-20 text-[300px] font-bold text-white/[0.02] leading-none select-none"
      >
        MQ
      </motion.div>
    </div>
  );
};

export default ParallaxElements;
