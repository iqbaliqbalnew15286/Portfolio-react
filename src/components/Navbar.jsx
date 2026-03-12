import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

// --- Komponen Individual untuk Ikon Dock Desktop ---
const DockIcon = ({ item, mouseX, scrollToSection, isDarkTheme }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-100, 0, 100], [42, 56, 42]);
  const marginTransform = useTransform(distance, [-100, 0, 100], [4, 10, 4]);

  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 200, damping: 15 });
  const margin = useSpring(marginTransform, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <div className="relative flex flex-col items-center justify-center group origin-bottom">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute -top-14 whitespace-nowrap px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-widest uppercase backdrop-blur-md shadow-2xl ${
              isDarkTheme
                ? "bg-[#111111]/90 border border-white/10 text-white"
                : "bg-white/90 border border-black/10 text-black"
            }`}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        style={{ width: size, height: size, marginInline: margin }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => scrollToSection(item.id)}
        className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
          isDarkTheme 
            ? "border-white/10 bg-transparent hover:bg-white/10 text-zinc-400 hover:text-white hover:border-white/30" 
            : "border-black/10 bg-transparent hover:bg-black/5 text-zinc-500 hover:text-black hover:border-black/30"
        }`}
      >
        <i className={`ri-${item.icon} text-lg md:text-xl transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}></i>
      </motion.button>
    </div>
  );
};


// --- Komponen Utama Navbar ---
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  
  const mouseX = useMotionValue(-Infinity);
  const isDarkTheme = isDark !== false; 

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Beranda", icon: "home-4-line" },
    { id: "about", label: "Profil", icon: "user-3-line" },
    { id: "tools", label: "Keahlian", icon: "lightbulb-line" },
    { id: "projects", label: "Proyek", icon: "briefcase-line" },
    { id: "contact", label: "Kontak", icon: "mail-line" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); 
    }
  };

  // Variasi Animasi Menu Mobile
  const menuListVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <>
      {/* 1. HEADER ATAS (LOGO, INFO DESKTOP TENGAH, TOGGLES KANAN) */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${
          active || mobileMenuOpen
            ? isDarkTheme
              ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4"
              : "bg-white/60 backdrop-blur-xl border-b border-black/5 py-4"
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Bagian Kiri: Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="logo cursor-pointer shrink-0" 
            onClick={() => scrollToSection("hero")}
          >
            <h1 className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${
              isDarkTheme ? "text-white" : "text-black"
            }`}>
              IQBAL<span className={isDarkTheme ? "text-zinc-500" : "text-zinc-400"}>.</span>
            </h1>
          </motion.div>

          {/* Bagian Tengah: Info Bar (Email, Github, Tagline) */}
          <div className={`hidden xl:flex items-center gap-6 text-[13px] font-medium tracking-wide ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}>
            <a href="mailto:emailanda@gmail.com" className={`flex items-center gap-2 transition-colors ${isDarkTheme ? "hover:text-white" : "hover:text-black"}`}>
              <i className="ri-mail-line text-[15px]"></i> emailanda@gmail.com
            </a>
            <span className={`w-px h-3 opacity-30 ${isDarkTheme ? "bg-white" : "bg-black"}`}></span>
            <a href="https://github.com/muhammadiqbal" target="_blank" rel="noreferrer" className={`flex items-center gap-2 transition-colors ${isDarkTheme ? "hover:text-white" : "hover:text-black"}`}>
              <i className="ri-github-fill text-[15px]"></i> github.com/muhammadiqbal
            </a>
            <span className={`w-px h-3 opacity-30 ${isDarkTheme ? "bg-white" : "bg-black"}`}></span>
            <span className="flex items-center gap-2">
              <i className="ri-code-s-slash-line text-[15px]"></i> Crafting modern <span className={isDarkTheme ? "text-white font-bold" : "text-black font-bold"}>digital experiences.</span>
            </span>
          </div>

          {/* Bagian Kanan: Toggles & Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Toggles (Hanya Desktop) */}
            <div className="hidden md:flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className={`flex items-center justify-center gap-1.5 w-12 h-9 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 border backdrop-blur-md ${
                  isDarkTheme
                    ? "bg-white/[0.03] border-white/10 hover:bg-white/10 text-white"
                    : "bg-black/[0.03] border-black/10 hover:bg-black/10 text-black"
                }`}
              >
                <span>{language === "id" ? "ID" : "EN"}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 border backdrop-blur-md ${
                  isDarkTheme
                    ? "bg-white/[0.03] border-white/10 hover:bg-white/10 text-white"
                    : "bg-black/[0.03] border-black/10 hover:bg-black/10 text-black"
                }`}
              >
                <i className={`${isDarkTheme ? "ri-moon-fill" : "ri-sun-fill"} text-sm`}></i>
              </motion.button>
            </div>

            {/* Hamburger Button (Hanya Mobile) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 border backdrop-blur-md ${
                isDarkTheme 
                  ? "bg-white/[0.03] border-white/10 hover:bg-white/10 text-white" 
                  : "bg-black/[0.03] border-black/10 hover:bg-black/10 text-black"
              }`}
            >
              <i className={`ri-${mobileMenuOpen ? "close-line" : "menu-4-fill"} text-xl`}></i>
            </motion.button>
          </div>

        </div>
      </motion.nav>


      {/* 2. DOCK BAWAH - Khusus Desktop */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-max px-4 hidden md:block">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(-Infinity)}
          className={`flex items-end gap-1 px-3 py-2.5 h-[68px] rounded-full border backdrop-blur-3xl shadow-2xl transition-colors duration-500 origin-bottom ${
            isDarkTheme 
              ? "bg-[#0a0a0a]/80 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
              : "bg-white/80 border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          }`}
        >
          {navItems.map((item) => (
            <DockIcon key={item.id} item={item} mouseX={mouseX} scrollToSection={scrollToSection} isDarkTheme={isDarkTheme} />
          ))}
        </motion.div>
      </div>


      {/* 3. MENU MOBILE OVERLAY ELEGAN - Khusus Mobile (<md) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] md:hidden flex flex-col pt-32 ${
              isDarkTheme ? "bg-black/90" : "bg-white/90"
            }`}
          >
            <motion.ul 
              variants={menuListVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col px-8"
            >
              {navItems.map((item, index) => (
                <motion.li key={item.id} variants={menuItemVariants} className="relative group">
                  {/* Garis pemisah atas */}
                  <div className={`absolute top-0 left-0 w-full h-[1px] ${isDarkTheme ? "bg-white/5" : "bg-black/5"}`}></div>
                  
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between w-full py-6 text-left overflow-hidden group"
                  >
                    {/* Teks Bergeser dan Berubah Warna */}
                    <span className={`text-4xl md:text-5xl font-black tracking-tighter transition-all duration-500 ease-out ${
                      isDarkTheme 
                        ? "text-zinc-600 group-hover:text-white group-active:text-white group-hover:translate-x-4" 
                        : "text-zinc-400 group-hover:text-black group-active:text-black group-hover:translate-x-4"
                    }`}>
                      {item.label}
                    </span>

                    {/* Ikon Panah Muncul & Bergeser */}
                    <i className={`ri-arrow-right-up-line text-3xl opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${
                      isDarkTheme ? "text-white" : "text-black"
                    }`}></i>
                  </button>
                  
                  {/* Garis pemisah bawah untuk item terakhir */}
                  {index === navItems.length - 1 && (
                    <div className={`absolute bottom-0 left-0 w-full h-[1px] ${isDarkTheme ? "bg-white/5" : "bg-black/5"}`}></div>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* Kotak Pengaturan Bawah */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`mt-auto mb-10 mx-8 p-5 rounded-3xl border shadow-2xl ${
                isDarkTheme ? "bg-[#111111] border-white/10" : "bg-[#fafafa] border-black/10"
              }`}
            >
                <div className="flex items-center justify-between gap-4">
                    <p className={`text-sm font-semibold tracking-wide ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}>
                        Pengaturan Tampilan
                    </p>
                    <div className="flex items-center gap-3">
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleLanguage} 
                          className={`text-xs font-bold w-12 h-10 rounded-full border transition-colors ${
                            isDarkTheme ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-black/5 border-black/10 hover:bg-black/10 text-black"
                          }`}
                        >
                            {language === "id" ? "ID" : "EN"}
                        </motion.button>
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleTheme} 
                          className={`w-10 h-10 rounded-full border transition-colors ${
                            isDarkTheme ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-black/5 border-black/10 hover:bg-black/10 text-black"
                          }`}
                        >
                            <i className={isDarkTheme ? "ri-moon-fill" : "ri-sun-fill"}></i>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;