import { useState } from "react";
import { motion } from "framer-motion";

const SpotifyNowPlaying = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Static data - bisa diganti manual
  const currentTrack = {
    title: "Lofi Hip Hop",
    artist: "Chill Vibes",
    albumArt:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
    isPlaying: true,
  };

  return (
    <motion.div
      className="fixed bottom-4 lg:bottom-6 right-4 lg:right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer group"
      >
        {isExpanded ? (
          // Expanded View
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 rounded-2xl p-3 lg:p-4 w-56 lg:w-64"
          >
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="relative">
                <img
                  src={currentTrack.albumArt}
                  alt="Album Art"
                  className="w-10 h-10 lg:w-14 lg:h-14 rounded-lg object-cover"
                />
                {currentTrack.isPlaying && (
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <div className="flex gap-0.5">
                      <motion.div
                        animate={{ height: [4, 12, 6] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="w-1 bg-violet-500 rounded-full"
                      />
                      <motion.div
                        animate={{ height: [8, 16, 10] }}
                        transition={{ repeat: Infinity, duration: 0.4 }}
                        className="w-1 bg-violet-500 rounded-full"
                      />
                      <motion.div
                        animate={{ height: [6, 14, 8] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-1 bg-violet-500 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs lg:text-sm font-medium truncate">
                  {currentTrack.title}
                </p>
                <p className="text-zinc-400 text-xs truncate">
                  {currentTrack.artist}
                </p>
              </div>
              <i className="ri-spotify-fill text-green-500 text-lg lg:text-xl"></i>
            </div>
          </motion.div>
        ) : (
          // Compact View
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-full px-3 lg:px-4 py-2 flex items-center gap-2 lg:gap-3"
          >
            <i className="ri-spotify-fill text-green-500 text-base lg:text-lg"></i>
            <div className="flex items-center gap-1.5 lg:gap-2">
              {currentTrack.isPlaying ? (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-green-500 rounded-full"
                />
              ) : (
                <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-zinc-500 rounded-full" />
              )}
              <span className="text-white text-xs lg:text-sm font-medium">
                {currentTrack.isPlaying ? "Now Playing" : "Paused"}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SpotifyNowPlaying;
