import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

// --- Komponen Individual untuk Ikon Dock Desktop (Dibuat jauh lebih fluid & bebas) ---
const DockIcon = ({ item, mouseX, scrollToSection, isDarkTheme }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Deteksi jarak mouse (Diperlebar menjadi 150 agar ikon tetangga bereaksi lebih awal dan mulus)
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Kurva animasi (Ukuran base lebih lega, membesar jauh lebih ekstrem saat di tengah)
  const sizeTransform = useTransform(distance, [-150, 0, 150], [48, 85, 48]);
  const marginTransform = useTransform(distance, [-150, 0, 150], [6, 20, 6]);

  // Efek Spring dibebaskan (stiffness direndahkan, damping diturunkan agar membal & organik)
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const margin = useSpring(marginTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center justify-end group origin-bottom h-full">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute bottom-full mb-4 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
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
        className={`relative flex items-center justify-center rounded-full border transition-colors duration-300 ${
          isHovered 
            ? isDarkTheme ? "bg-white/10 border-white/30 text-white shadow-lg" : "bg-black/5 border-black/30 text-black shadow-lg"
            : isDarkTheme ? "bg-transparent border-white/5 text-zinc-400" : "bg-transparent border-black/5 text-zinc-500"
        }`}
      >
        <i className={`ri-${item.icon} transition-all duration-300`} style={{ fontSize: isHovered ? '28px' : '20px' }}></i>
        
        {/* Titik indikator aktif melayang di bawah icon */}
        {isHovered && (
          <motion.div 
            layoutId="dockIndicator"
            className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-current"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    </div>
  );
};


// --- Komponen Utama Navbar ---
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true); // State untuk Top Banner Crafting
  
  const { t, language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  
  const mouseX = useMotionValue(-Infinity);
  const isDarkTheme = isDark !== false; 

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home", icon: "home-4-line" },
    { id: "about", label: "About", icon: "user-3-line" },
    { id: "experience", label: "Experience", icon: "history-line" },
    { id: "projects", label: "Projects", icon: "briefcase-line" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); 
    }
  };

  return (
    <>
      {/* 1. KONTainer HEADER GLOBAL (Sticky Atas) */}
      <header className="fixed top-0 left-0 right-0 z-[110] flex flex-col">
        
        {/* A. BANNER "CRAFTING" (Bisa di-close oleh user) */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, overflow: "hidden" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`w-full flex items-center justify-center py-2.5 px-4 relative z-20 ${
                isDarkTheme ? "bg-[#050505] border-b border-white/5" : "bg-zinc-100 border-b border-black/5"
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs md:text-sm">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${isDarkTheme ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                  <i className="ri-code-s-slash-line text-[10px]"></i>
                </div>
                <span className={`tracking-wide ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}>
                  Crafting modern <strong className={`font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>digital experiences.</strong>
                </span>
              </div>
              
              <button
                onClick={() => setShowBanner(false)}
                className={`absolute right-4 w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                  isDarkTheme ? "bg-white/5 hover:bg-white/15 text-zinc-400" : "bg-black/5 hover:bg-black/15 text-zinc-600"
                }`}
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* B. NAVBAR UTAMA (Logo & Menu Button) */}
        <motion.nav
          className={`w-full transition-all duration-500 z-10 ${
            active 
              ? isDarkTheme ? "bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg border-b border-white/5" : "bg-white/80 backdrop-blur-xl shadow-sm border-b border-black/5" 
              : "bg-transparent py-2"
          }`}
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
            
            {/* Bagian Kiri: Logo Bersih */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="logo cursor-pointer shrink-0" 
              onClick={() => scrollToSection("hero")}
            >
              <h1 className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors ${
                isDarkTheme ? "text-white" : "text-black"
              }`}>
                IQBAL<span className={isDarkTheme ? "text-zinc-500" : "text-zinc-400"}>.</span>
              </h1>
            </motion.div>

            {/* Bagian Kanan: Toggles & Hamburger Bulat */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Toggles (Hanya Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={toggleLanguage}
                  className={`flex items-center justify-center w-12 h-10 rounded-full text-[11px] font-bold tracking-wider border backdrop-blur-md transition-colors ${
                    isDarkTheme ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-black/5 border-black/10 hover:bg-black/10 text-black"
                  }`}
                >
                  {language === "id" ? "ID" : "EN"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-md transition-colors ${
                    isDarkTheme ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-black/5 border-black/10 hover:bg-black/10 text-black"
                  }`}
                >
                  <i className={`${isDarkTheme ? "ri-moon-fill" : "ri-sun-fill"}`}></i>
                </motion.button>
              </div>

              {/* Hamburger Button Bulat (Sesuai Referensi Gambar Mobile) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className={`md:hidden flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md transition-all ${
                  isDarkTheme 
                    ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" 
                    : "bg-black/5 border-black/10 hover:bg-black/10 text-black"
                }`}
              >
                <i className="ri-menu-line text-xl"></i>
              </motion.button>
            </div>

          </div>
        </motion.nav>
      </header>


      {/* 2. DOCK BAWAH - Khusus Desktop (Lebih Elegan & Fluid) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-max px-4 hidden md:block">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(-Infinity)}
          // Efek floating dock yang lebih premium
          className={`flex items-end gap-1 px-4 py-3 h-[76px] rounded-full border backdrop-blur-3xl transition-colors duration-500 origin-bottom ${
            isDarkTheme 
              ? "bg-[#111111]/80 border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]" 
              : "bg-white/80 border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          }`}
        >
          {navItems.map((item) => (
            <DockIcon key={item.id} item={item} mouseX={mouseX} scrollToSection={scrollToSection} isDarkTheme={isDarkTheme} />
          ))}
        </motion.div>
      </div>


      {/* 3. MENU MOBILE DRAWER (SIDEBAR) - Khusus Mobile (<md) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Latar Belakang Gelap / Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm md:hidden cursor-pointer"
            />

            {/* Kotak Drawer Menu (Geser dari kanan) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-[340px] z-[130] flex flex-col shadow-2xl md:hidden ${
                isDarkTheme ? "bg-[#0a0a0a] border-l border-white/5" : "bg-[#fcfcfc] border-l border-black/5"
              }`}
            >
              {/* Header: Judul "Menu" & Tombol Close X */}
              <div className={`flex items-center justify-between p-6 border-b ${isDarkTheme ? "border-white/5" : "border-black/5"}`}>
                <span className={`text-xl font-bold tracking-tight ${isDarkTheme ? "text-white" : "text-black"}`}>Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    isDarkTheme ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
                  }`}
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>

              {/* Daftar Tautan Halaman */}
              <div className="flex flex-col gap-1 p-4 overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between w-full px-5 py-4 rounded-[1rem] transition-colors group ${
                      isDarkTheme ? "hover:bg-white/5" : "hover:bg-black/5"
                    }`}
                  >
                    <span className={`text-base font-semibold transition-colors ${
                      isDarkTheme ? "text-zinc-300 group-hover:text-white" : "text-zinc-600 group-hover:text-black"
                    }`}>
                      {item.label}
                    </span>
                    <i className={`ri-arrow-right-s-line text-xl transition-colors ${
                      isDarkTheme ? "text-zinc-600 group-hover:text-white" : "text-zinc-400 group-hover:text-black"
                    }`}></i>
                  </button>
                ))}
              </div>

              {/* Footer Drawer: Pengaturan Bahasa/Tema & Tombol Contact Us */}
              <div className={`mt-auto p-5 border-t flex flex-col gap-5 ${isDarkTheme ? "border-white/5" : "border-black/5"}`}>
                
                <div className="flex items-center justify-between px-2">
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${isDarkTheme ? "text-zinc-600" : "text-zinc-400"}`}>Pengaturan</span>
                  <div className="flex items-center gap-2">
                    <button onClick={toggleLanguage} className={`w-9 h-9 rounded-full text-[10px] font-bold transition-colors ${
                      isDarkTheme ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-black hover:bg-black/10"
                    }`}>
                      {language === "id" ? "ID" : "EN"}
                    </button>
                    <button onClick={toggleTheme} className={`w-9 h-9 rounded-full transition-colors ${
                      isDarkTheme ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-black hover:bg-black/10"
                    }`}>
                      <i className={isDarkTheme ? "ri-moon-fill" : "ri-sun-fill"}></i>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => scrollToSection("contact")}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] font-bold text-[13px] tracking-wide transition-transform active:scale-95 shadow-lg ${
                      isDarkTheme ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    Contact Us <i className="ri-send-plane-fill"></i>
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection("tools")} 
                    className={`w-[52px] h-[52px] shrink-0 flex items-center justify-center rounded-full transition-transform active:scale-95 ${
                      isDarkTheme ? "bg-[#1f1f1f] text-white border border-white/5" : "bg-[#ebebeb] text-black border border-black/5"
                    }`}
                  >
                    <i className="ri-equalizer-line text-lg"></i>
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;