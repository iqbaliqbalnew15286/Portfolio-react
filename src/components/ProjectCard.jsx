import { motion } from "framer-motion";

const ProjectCard = ({ proyek, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-zinc-900/80 rounded-xl overflow-hidden"
    >
      {/* Border Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 p-[1px]">
          <div className="absolute inset-0 bg-zinc-900/90 rounded-xl" />
        </div>
      </div>

      {/* Alternative border glow using box-shadow */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />

      {/* Card Content */}
      <div className="relative z-10 p-3 lg:p-4 bg-zinc-900/90 rounded-xl h-full">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg mb-3 lg:mb-4">
          <motion.img
            src={proyek.gambar}
            alt={proyek.nama}
            loading="lazy"
            className="w-full h-40 lg:h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Info */}
        <div>
          <motion.h1
            className="text-lg lg:text-2xl font-bold mb-1 lg:mb-2 text-white"
            whileHover={{ color: "#a855f7" }}
          >
            {proyek.nama}
          </motion.h1>
          <p className="text-sm lg:text-base mb-3 lg:mb-4 opacity-70 text-zinc-400 line-clamp-2">
            {proyek.desk}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4">
            {proyek.tools.map((tool, idx) => (
              <motion.span
                key={idx}
                className="py-1 px-2 lg:px-3 border border-zinc-600 bg-zinc-800/50 rounded-md text-xs font-semibold text-zinc-400 group-hover:border-violet-500/50 group-hover:text-violet-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>

          {/* Button */}
          <motion.a
            href="#"
            className="block w-full bg-violet-700/80 group-hover:bg-violet-600 p-2.5 lg:p-3 rounded-lg text-center border border-zinc-600 group-hover:border-violet-500 transition-all text-sm lg:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Lihat Website
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
