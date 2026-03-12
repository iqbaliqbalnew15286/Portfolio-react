import { listTools } from "../data";
import { motion } from "framer-motion";

const BentoGrid = () => {
  // Different sizes for bento grid effect - responsive
  const getGridSpan = (index) => {
    // Desktop (lg): 3 columns
    // Tablet (md): 2 columns
    // Mobile: 1 column
    const patterns = [
      "lg:col-span-2 lg:row-span-2", // Large
      "lg:col-span-1 lg:row-span-1", // Small
      "lg:col-span-2 lg:row-span-1", // Wide
      "lg:col-span-1 lg:row-span-2", // Tall
      "lg:col-span-1 lg:row-span-1", // Small
      "lg:col-span-2 lg:row-span-1", // Wide
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[140px] lg:auto-rows-[120px]">
      {listTools.map((tool, index) => (
        <motion.div
          key={tool.id}
          className={`${getGridSpan(index)} relative group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all duration-300 cursor-pointer`}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <div className="p-4 lg:p-6 h-full flex flex-col justify-between relative z-10">
            <img
              src={tool.gambar}
              alt={tool.nama}
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain transition-transform group-hover:scale-110"
            />
            <div>
              <h3 className="text-white font-semibold text-base lg:text-lg">
                {tool.nama}
              </h3>
              <p className="text-zinc-500 text-sm">{tool.ket}</p>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-bl from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;
