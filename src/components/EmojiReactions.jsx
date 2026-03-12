import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const emojis = [
  { emoji: "❤️", label: "Love" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "🚀", label: "Rocket" },
  { emoji: "👏", label: "Clap" },
  { emoji: "😄", label: "Happy" },
];

const EmojiReactions = ({ projectId }) => {
  const { t } = useLanguage();
  const [reactions, setReactions] = useState({});
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const handleReaction = (emojiObj) => {
    const key = `${projectId}-${emojiObj.label}`;
    setReactions((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    const id = Date.now();
    setFloatingEmojis((prev) => [...prev, { id, emoji: emojiObj.emoji }]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 1000);
  };

  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <div className="relative flex flex-col items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        {emojis.map((emojiObj) => {
          const key = `${projectId}-${emojiObj.label}`;
          const count = reactions[key] || 0;
          return (
            <div key={emojiObj.label} className="relative">
              <motion.button
                onClick={() => handleReaction(emojiObj)}
                className="text-xl p-1.5 rounded-full bg-zinc-800/30 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-violet-500/50 transition-all"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {emojiObj.emoji}
              </motion.button>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-violet-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {floatingEmojis.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-2xl pointer-events-none"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <p className="text-zinc-500 text-xs">
        {totalReactions > 0
          ? `${totalReactions} ${t("reactions")}`
          : t("clickToReact")}
      </p>
    </div>
  );
};

export default EmojiReactions;
