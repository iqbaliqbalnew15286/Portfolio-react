import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LocalTimeStatus = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format waktu Indonesia (WIB)
      const options = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      const dateOptions = {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        day: "numeric",
        month: "short",
      };

      setTime(now.toLocaleTimeString("id-ID", options));
      setDate(now.toLocaleDateString("id-ID", dateOptions));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed top-20 lg:top-24 left-4 lg:left-6 z-40 hidden md:block"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-xs lg:text-sm">
            Bogor, Indonesia
          </span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white text-base lg:text-lg font-semibold">
            {time}
          </span>
          <span className="text-zinc-600 text-xs lg:text-sm">•</span>
          <span className="text-zinc-500 text-xs lg:text-sm">{date}</span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5 w-fit"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
          <span className="text-green-400 text-xs font-medium">
            Available for new projects
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocalTimeStatus;
