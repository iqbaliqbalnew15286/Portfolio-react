import { listTools } from "../data";
import { useTheme } from "./ThemeContext";

const InfiniteMarquee = () => {
  const { isDark } = useTheme();
  const dark = isDark;

  // Duplicate tools for seamless loop
  const duplicatedTools = [...listTools, ...listTools, ...listTools];

  return (
    <div className="overflow-hidden py-4 lg:py-8 relative">
      <div className="flex animate-marquee">
        {duplicatedTools.map((tool, index) => (
          <div
            key={`${tool.id}-${index}`}
            className="flex-shrink-0 mx-3 lg:mx-6 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg"
          >
            <img
              src={tool.gambar}
              alt={tool.nama}
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
            />
            <span className="text-zinc-400 text-xs lg:text-sm font-medium whitespace-nowrap">
              {tool.nama}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth edges */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-r ${dark ? "from-black" : "from-white"} to-transparent z-10`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-gradient-to-l ${dark ? "from-black" : "from-white"} to-transparent z-10`}
      />
    </div>
  );
};

export default InfiniteMarquee;
