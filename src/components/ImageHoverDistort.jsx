import { useState } from "react";
import { motion } from "framer-motion";
import DataImage from "../data";

const ImageHoverDistort = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Grayscale base image */}
      <motion.img
        src={DataImage.HeroImage}
        alt="Profile"
        className="w-full h-full object-cover filter grayscale"
        animate={{
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Color overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Distortion effect using scale and rotate */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, 1, -1, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          rotate: { repeat: Infinity, duration: 0.5 },
        }}
      />

      {/* Border glow */}
      <div
        className={`absolute inset-0 rounded-xl border-2 border-violet-500/0 transition-all duration-300 ${isHovered ? "border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]" : ""}`}
      />

      {/* Label */}
      <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
        <motion.span
          className="text-white text-xs lg:text-sm font-medium px-2 lg:px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full"
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Hover to reveal
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ImageHoverDistort;
