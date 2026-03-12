import { motion, useScroll, useTransform } from "framer-motion";

const BigBoldTypography = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Hero Section Background Text */}
      <div className="absolute top-1/3 -left-20 lg:block hidden">
        <h1 className="text-[15rem] xl:text-[20rem] font-bold text-white/[0.03] leading-none tracking-tighter select-none">
          DESIGN
        </h1>
      </div>

      {/* About Section Background Text */}
      <div className="absolute top-[150vh] -right-20 lg:block hidden">
        <h1 className="text-[12rem] xl:text-[16rem] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
          CREATE
        </h1>
      </div>

      {/* Tools Section Background Text */}
      <div className="absolute top-[250vh] -left-10 lg:block hidden">
        <h1 className="text-[10rem] xl:text-[14rem] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
          BUILD
        </h1>
      </div>

      {/* Projects Section Background Text */}
      <div className="absolute top-[380vh] -right-10 lg:block hidden">
        <h1 className="text-[14rem] xl:text-[18rem] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
          WORK
        </h1>
      </div>

      {/* Contact Section Background Text */}
      <div className="absolute top-[500vh] -left-20 lg:block hidden">
        <h1 className="text-[12rem] xl:text-[16rem] font-bold text-white/[0.02] leading-none tracking-tighter select-none">
          CONNECT
        </h1>
      </div>
    </motion.div>
  );
};

export default BigBoldTypography;
