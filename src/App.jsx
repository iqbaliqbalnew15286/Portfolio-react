import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { listTools, listProyek } from "./data";
const HeroImage = "/assets/hero-img.webp"; // Gambar ini masih dipakai untuk section About
import { useLanguage } from "./components/LanguageContext";
import { useTheme } from "./components/ThemeContext";

// Components
import LoadingScreen from "./components/LoadingScreen";
import SpotifyNowPlaying from "./components/SpotifyNowPlaying";
import InfiniteMarquee from "./components/InfiniteMarquee";
import EmojiReactions from "./components/EmojiReactions";
import Robot3D from "./components/Robot3D";

// =========================================================================
// KOMPONEN JAM DIGITAL (Dipindah ke atas / Hero Section)
// =========================================================================
const LiveClock = ({ isDarkTheme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time
    .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    .replace(".", ":");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md mb-6 w-fit shadow-sm ${
        isDarkTheme
          ? "bg-white/5 border-white/10 text-zinc-300"
          : "bg-black/5 border-black/10 text-zinc-600"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <i className="ri-map-pin-line text-xs"></i> Bogor, {formattedTime} WIB
    </motion.div>
  );
};

// =========================================================================
// KOMPONEN UTAMA (APP)
// =========================================================================
function App() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const isDarkTheme = isDark !== false;

  const [isLoading, setIsLoading] = useState(true);

  // State Timeline Experience
  const [showAllTimeline, setShowAllTimeline] = useState(false);

  // Ref untuk fungsi panah geser Horizontal Carousel Proyek & Tools Mobile
  const carouselRef = useRef(null);
  const toolsCarouselRef = useRef(null);

  // State untuk Contact Form
  const [contactMethod, setContactMethod] = useState("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "Web Development",
    message: "",
  });

  // --- Efek Spotlight Latar Belakang Interaktif ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  // ------------------------------------------------

  // Efek Smooth Scroll Manual (Navigasi)
  useEffect(() => {
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleNavClick));
    return () =>
      links.forEach((link) =>
        link.removeEventListener("click", handleNavClick),
      );
  }, []);

  // Fungsi untuk tombol panah proyek
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Fungsi untuk mengirim pesan via WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, interest, message } = formData;
    const phoneNumber = "6281234567890"; // Ganti dengan nomor asli Anda
    const text = `Halo Iqbal, nama saya *${name || "Seseorang"}*.\nSaya tertarik untuk berdiskusi tentang *${interest}*.\n\nPesan:\n${message || "-"}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };
const educationalPath = [
    {
      id: 3,
      title: "SMK AMALIAH 1 CIAWI KABUPATEN BOGOR",
      subtitle: "Sekolah Menengah Kejuruan (PPLG)",
      date: "2024 - Sekarang",
      logo: "/assets/educational/smk.png",
    },
    {
      id: 2,
      title: "SMPN 1 CIAWI KABUPATEN BOGOR",
      subtitle: "Sekolah Menengah Pertama",
      date: "2020 - 2023",
      logo: "/assets/educational/smp.png",
    },
    {
      id: 1,
      title: "SDN 1 CIAWI KABUPATEN BOGOR",
      subtitle: "Sekolah Dasar",
      date: "2014 - 2020",
      logo: "/assets/educational/sd.jpg",
    },
  ];


  const professionalExperience = [
    {
      id: 2,
      title: "PT Rizqallah Boer Makmur",
      subtitle: "FULL STACK WEB DEVELOPER",
      date: "2025",
      icon: "gamepad-line",
    },
    {
      id: 1,
      title: "SMK AMALIAH ",
      subtitle: "DIGITAL BUSINEES",
      date: "2025",
      icon: "code-box-line",
    },
  ];

  const displayedEducation = educationalPath;
  const displayedExperience = showAllTimeline
    ? professionalExperience
    : professionalExperience.slice(0, 1);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // --- LOADING SCREEN ---
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 overflow-hidden relative selection:bg-white selection:text-black ${isDarkTheme ? "bg-[#050505] text-white" : "bg-[#fafafa] text-black"}`}
    >
      {/* ================= BACKGROUND INTERAKTIF ================= */}
      <div className="noise-overlay pointer-events-none z-50 opacity-20"></div>

      {/* Spotlight mengikuti mouse (Hanya di PC) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
        style={{
          background: isDarkTheme
            ? `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.03), transparent 40%)`
            : `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(0,0,0,0.02), transparent 40%)`,
        }}
      />

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_50%,transparent_100%)] ${!isDarkTheme && "opacity-40"}`}
        ></div>
      </div>
      {/* ========================================================= */}

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        {/* --- 1. HERO SECTION --- */}
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-center pt-32 pb-10 scroll-mt-28"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col order-2 lg:order-1"
            >
              <LiveClock isDarkTheme={isDarkTheme} />

              <motion.p
                variants={fadeUp}
                className={`text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4 ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}
              >
                FULL STACK WEB DEVELOPER
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-[3.2rem] leading-[1.05] sm:text-7xl md:text-8xl lg:text-[6rem] font-black tracking-tighter uppercase mb-4"
              >
                Menciptakan <br /> Prototipe <br /> Digital
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className={`text-base md:text-lg max-w-lg leading-relaxed ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Saya membangun ruang digital yang tidak hanya nyaman dipandang,
                tetapi juga aman untuk digunakan. Menggabungkan prinsip desain
                modern dengan praktik keamanan web terbaik untuk pengalaman
                pengguna yang maksimal
              </motion.p>
            </motion.div>

            {/* AREA ROBOT 3D (Anti-Lag, dihapus will-change) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="relative w-full h-[350px] sm:h-[400px] lg:h-[500px] z-10"
              >
                <Robot3D />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- 2. PROFILE SECTION --- */}
        <section
          id="about"
          className={`py-24 border-t scroll-mt-28 ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 flex justify-center lg:justify-start"
            >
              <div
                className={`w-full max-w-[320px] rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center border shadow-2xl ${isDarkTheme ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}
              >
                <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-800">
                  <img
                    src={HeroImage}
                    alt="Muhammad Iqbal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">
                  Muhammad Iqbal
                </h3>
                <p
                  className={`text-[10px] font-black tracking-widest uppercase mb-5 ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                >
                  FULL STACK WEB DEVELOPER
                </p>
                <p
                  className={`text-xs leading-relaxed mb-8 px-2 ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Backend Developer & Frontend Engineer building digital
                  masterpieces.
                </p>
                <div className="flex gap-4">
                  {["github-line", "linkedin-line", "instagram-line"].map(
                    (icon, i) => (
                      <a
                        key={i}
                    href="https://www.instagram.com/iqbaalll.mm"
                       
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110 hover:-translate-y-1 ${isDarkTheme ? "border-white/10 hover:bg-white/10 text-white" : "border-black/10 hover:bg-black/5 text-black"}`}
                      >
                        <i className={`ri-${icon} text-lg`}></i>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8 flex flex-col gap-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
                Lebih Dari Sekadar <br className="hidden md:block" />{" "}
                Development.
              </h2>
              <div
                className={`flex flex-col gap-6 text-base md:text-lg leading-relaxed ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
              >
                <p>
                  Menggabungkan presisi teknis dengan kreativitas untuk
                  membangun solusi web yang modern, efisien, dan scalable. Saya
                  berfokus pada mengubah ide kompleks menjadi aplikasi yang
                  bersih, mudah dirawat, dan berkinerja tinggi.
                </p>
                <p>
                  Saya Muhammad Iqbal, seorang developer yang mengubah ide
                  menjadi solusi nyata yang siap digunakan di dunia nyata, serta
                  menciptakan produk yang benar-benar nyaman dan menyenangkan
                  bagi penggunanya.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-6 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-4xl lg:text-5xl font-black mb-2">2+</h4>
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                  >
                    Tahun Pengalaman
                  </p>
                </div>
                <div>
                  <h4 className="text-4xl lg:text-5xl font-black mb-2">10+</h4>
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                  >
                    Proyek Selesai
                  </p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-4xl lg:text-5xl font-black mb-2">100%</h4>
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                  >
                    Berorientasi Kualitas
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 3. TIMELINE / EXPERIENCE SECTION --- */}
        <section
          id="experience"
          className={`py-24 border-t relative overflow-hidden scroll-mt-28 ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
        >
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 relative">
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-40 flex flex-col gap-6"
              >
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border w-fit ${isDarkTheme ? "bg-white/5 border-white/10 text-zinc-300" : "bg-black/5 border-black/10 text-zinc-600"}`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                  Track Record
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                  Professional <br /> Experience.
                </h2>
                <p
                  className={`text-base md:text-lg max-w-md leading-relaxed ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Perjalanan pendidikan, karier, kolaborasi, dan proyek
                  kompetitif dalam membangun ekosistem digital serta pengalaman
                  interaktif.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-7 relative">
              <div
                className={`absolute left-4 md:left-[39px] top-4 bottom-0 w-[2px] ${isDarkTheme ? "bg-white/5" : "bg-black/5"}`}
              ></div>

              <div className="flex flex-col gap-16">
                {/* 3A. Educational Path */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 pl-12 md:pl-[84px]">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm ${isDarkTheme ? "bg-zinc-900 border-white/10 text-zinc-400" : "bg-white border-black/10 text-zinc-600"}`}
                    >
                      <i className="ri-building-2-line text-sm"></i>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      Educational Path
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {displayedEducation.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="relative flex items-center group pl-12 md:pl-[84px] overflow-hidden"
                      >
                        <div className="absolute left-[11px] md:left-[34px] w-3 h-3 rounded-full bg-zinc-700 border-4 border-black group-hover:bg-white group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-all duration-300 z-10"></div>
                        <div
                          className={`absolute left-[20px] md:left-[40px] w-8 md:w-11 h-[2px] transition-colors duration-300 ${isDarkTheme ? "bg-white/5 group-hover:bg-white/20" : "bg-black/5 group-hover:bg-black/20"}`}
                        ></div>

                        <div
                          className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-[1.5rem] border transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111] border-white/5 hover:border-white/20" : "bg-white border-black/5 hover:border-black/20 hover:shadow-lg"}`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border bg-white ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
                            >
                              <img
                                src={item.logo}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold tracking-tight">
                                {item.title}
                              </h4>
                              <p
                                className={`text-sm mt-0.5 ${isDarkTheme ? "text-zinc-500" : "text-zinc-500"}`}
                              >
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase border w-fit ${isDarkTheme ? "bg-white/5 border-white/10 text-zinc-400" : "bg-black/5 border-black/10 text-zinc-500"}`}
                          >
                            {item.date}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 3B. Project & Competitions */}
                <div className="flex flex-col gap-6 mt-4">
                  <div className="flex items-center gap-4 pl-12 md:pl-[84px]">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm ${isDarkTheme ? "bg-zinc-900 border-white/10 text-zinc-400" : "bg-white border-black/10 text-zinc-600"}`}
                    >
                      <i className="ri-gamepad-line text-sm"></i>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      Project & Competitions
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    <AnimatePresence initial={false}>
                      {displayedExperience.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0, y: -20 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative flex items-center group pl-12 md:pl-[84px] origin-top overflow-hidden"
                        >
                          <div className="absolute left-[11px] md:left-[34px] w-3 h-3 rounded-full bg-zinc-700 border-4 border-black group-hover:bg-blue-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.8)] group-hover:scale-125 transition-all duration-300 z-10"></div>
                          <div
                            className={`absolute left-[20px] md:left-[40px] w-8 md:w-11 h-[2px] transition-colors duration-300 ${isDarkTheme ? "bg-white/5 group-hover:bg-white/20" : "bg-black/5 group-hover:bg-black/20"}`}
                          ></div>
                          <div
                            className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-[1.5rem] border transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111] border-white/5 hover:border-blue-500/30" : "bg-white border-black/5 hover:border-blue-500/30 hover:shadow-lg"}`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${isDarkTheme ? "bg-zinc-900 border-white/10 text-white" : "bg-zinc-50 border-black/10 text-black"}`}
                              >
                                <i className={`ri-${item.icon} text-xl`}></i>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold tracking-tight">
                                  {item.title}
                                </h4>
                                <p
                                  className={`text-sm mt-0.5 ${isDarkTheme ? "text-blue-400/80" : "text-blue-600/80"}`}
                                >
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase border w-fit ${isDarkTheme ? "bg-white/5 border-white/10 text-zinc-400" : "bg-black/5 border-black/10 text-zinc-500"}`}
                            >
                              {item.date}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="pl-12 md:pl-[84px] mt-4">
                    <button
                      onClick={() => setShowAllTimeline(!showAllTimeline)}
                      className={`px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 ${isDarkTheme ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}
                    >
                      {showAllTimeline ? "Show Less" : "Show All Timeline"}
                      <i
                        className={`ri-arrow-${showAllTimeline ? "up" : "down"}-s-line ml-1`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. HIGHLIGHTS / BENTO GRID SECTION --- */}
        <section
          id="highlights"
          className={`py-24 border-t relative scroll-mt-28 ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
        >
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Sekilas Tentang Saya
            </h2>
            <p
              className={`text-base md:text-lg ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Eksplorasi teknologi, proyek terkini, hingga selera hiburan saya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* ... (Konten Bento Grid tidak berubah, sudah optimal) ... */}
            {/* Spotify */}
            <div
              className={`col-span-1 md:col-span-12 lg:col-span-6 relative overflow-hidden p-6 md:p-8 rounded-[2rem] border flex flex-col justify-center group transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111]/80 border-white/5 hover:border-green-500/30" : "bg-white border-black/5 hover:border-green-500/30"}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <i className="ri-spotify-fill text-5xl text-green-500"></i>
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop"
                    alt="Album Cover"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest text-green-500 uppercase">
                      Currently Playing
                    </span>
                    <div className="flex gap-[2px] items-end h-3">
                      <motion.div
                        animate={{ height: ["40%", "100%", "40%"] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-1 bg-green-500 rounded-full"
                      ></motion.div>
                      <motion.div
                        animate={{ height: ["70%", "30%", "70%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          delay: 0.2,
                        }}
                        className="w-1 bg-green-500 rounded-full"
                      ></motion.div>
                      <motion.div
                        animate={{ height: ["30%", "80%", "30%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          delay: 0.4,
                        }}
                        className="w-1 bg-green-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-1">
                    Push to Production
                  </h3>
                  <p
                    className={`text-sm ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    From Daily Mix Playlist
                  </p>
                </div>
              </div>
            </div>

            {/* Github */}
            <a
              href="https://github.com/iqbaliqbal15286"
              target="_blank"
              rel="noopener noreferrer"
              className={`col-span-1 md:col-span-12 lg:col-span-6 relative overflow-hidden p-6 md:p-8 rounded-[2rem] border flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 block cursor-pointer ${isDarkTheme ? "bg-[#111]/80 border-white/5 hover:border-white/20" : "bg-white border-black/5 hover:border-black/20"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                  <i className="ri-github-fill text-lg"></i> GitHub
                </div>
                <i className="ri-external-link-line opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
              <div className="grid grid-cols-12 gap-1.5 opacity-80 mb-4">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isGreen = Math.random() > 0.5;
                  const isPurple = Math.random() > 0.85;
                  const baseOpacity = Math.random() * 0.8 + 0.2;
                  return (
                    <motion.div
                      key={i}
                      animate={
                        isGreen || isPurple
                          ? {
                              opacity: [
                                baseOpacity,
                                baseOpacity * 0.3,
                                baseOpacity,
                              ],
                            }
                          : { opacity: isDarkTheme ? 0.1 : 0.4 }
                      }
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                      whileHover={{ scale: 1.5, zIndex: 10, opacity: 1 }}
                      className={`w-full aspect-square rounded-[3px] transition-colors ${isPurple ? "bg-violet-500" : isGreen ? "bg-green-500" : isDarkTheme ? "bg-zinc-800" : "bg-zinc-300"}`}
                    />
                  );
                })}
              </div>
              <div
                className={`flex gap-4 text-[11px] font-bold tracking-wider uppercase mt-auto ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}
              >
                <span className="flex items-center gap-1 text-yellow-500">
                  <i className="ri-star-fill"></i> 120+ Stars
                </span>
                <span className="flex items-center gap-1 text-green-500">
                  <i className="ri-git-commit-fill"></i> 450+ Commits
                </span>
              </div>
            </a>

            {/* Letterboxd */}
            <div
              className={`col-span-1 md:col-span-12 lg:col-span-7 relative overflow-hidden p-6 md:p-8 rounded-[2rem] border flex flex-col group transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111]/80 border-white/5 hover:border-orange-500/30" : "bg-white border-black/5 hover:border-orange-500/30"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                  IDK JUST PUT IT THERE
                </span>
                <div className="flex gap-1 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <span className="ml-1 text-xs font-bold tracking-wider">
                    Letterboxd
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 md:gap-4 mt-auto">
                {[
                  "/assets/poster/poster1.jpg",
                  "/assets/poster/poster2.jpg",
                  "/assets/poster/poster3.jpg",
                  "/assets/poster/poster4.jpg",
                ].map((poster, i) => (
                  <div
                    key={i}
                    className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-white/10 group/poster"
                  >
                    <img
                      src={poster}
                      alt={`Movie Poster ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agency */}
            <div
              className={`col-span-1 md:col-span-12 lg:col-span-5 relative overflow-hidden p-6 md:p-8 rounded-[2rem] border flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111]/80 border-white/5 hover:border-blue-500/50" : "bg-white border-black/5 hover:border-blue-500/50"}`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"></div>
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <i className="ri-building-4-line"></i>
                  </div>{" "}
                  Explore My Agency
                </div>
                <i className="ri-arrow-right-up-line text-xl opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"></i>
              </div>
              <div className="mt-auto">
                <h3 className="text-3xl font-black tracking-tight mb-2">
                  Stackup.id
                </h3>
                <p
                  className={`text-sm mb-8 ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Build Your Next-Gen Digital Infrastructure with us.
                </p>
                <span className="text-xs font-bold tracking-widest uppercase text-blue-500 flex items-center gap-2">
                  Visit Website <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </div>

            {/* Learning */}
            <div
              className={`col-span-1 md:col-span-12 lg:col-span-6 relative overflow-hidden p-6 md:p-8 rounded-[2rem] border flex flex-col group transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111]/80 border-white/5" : "bg-white border-black/5"}`}
            >
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">
                <i className="ri-compass-3-line text-lg"></i> Currently Learning
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">
                Tech Exploration
              </h3>
              <p
                className={`text-sm mb-8 ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Focusing on expanding boundaries in Web Development and AI
                Engineering.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Golang", "Hardware Hacking", "Rust", "Three.js"].map(
                  (tech, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-colors ${isDarkTheme ? "bg-white/[0.02] border-white/10 hover:bg-white/10" : "bg-black/[0.02] border-black/10 hover:bg-black/5"}`}
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Current Project */}
            <div
              className={`col-span-1 md:col-span-12 lg:col-span-6 relative overflow-hidden p-6 md:p-8 rounded-[2rem] border flex flex-col group transition-all duration-300 hover:-translate-y-1 ${isDarkTheme ? "bg-[#111]/80 border-white/5" : "bg-white border-black/5"}`}
            >
              <div className="absolute top-8 right-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">
                <i className="ri-code-s-slash-line text-lg"></i> Current Project
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-1">
                The Neighbor's Voice
              </h3>
              <p
                className={`text-xs italic mb-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}
              >
                "How long will you stay silent"
              </p>
              <p
                className={`text-sm leading-relaxed mt-auto ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Pengembangan <em>game</em> psikologis misteri dengan Godot
                Engine. Berfokus pada penceritaan bercabang dan narasi moral
                yang gelap.
              </p>
            </div>
          </div>
        </section>

        {/* --- 5. TOOLS SECTION (DIOPTIMALKAN UNTUK MOBILE) --- */}
        <section
          id="tools"
          className={`py-24 border-t relative scroll-mt-28 ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-[150px] pointer-events-none z-0 opacity-30 bg-zinc-500/20"></div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="relative z-10"
          >
            <div className="text-center mb-16">
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
              >
                {t("toolsTitle") || "Tools & Skills"}
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className={`text-base md:text-lg ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {t("toolsDesc") ||
                  "Teknologi yang saya gunakan untuk menciptakan ekosistem digital."}
              </motion.p>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8 } },
              }}
            >
              <InfiniteMarquee />
            </motion.div>

            {/* Kontainer Responsif: Grid di Desktop, Horizontal Scroll di Mobile */}
            <div
              ref={toolsCarouselRef}
              className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-6 mt-16 pb-8 md:pb-0 px-6 md:px-0 md:grid-cols-4 lg:grid-cols-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
            >
              {listTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`shrink-0 snap-center w-[160px] md:w-auto relative p-6 rounded-3xl border flex flex-col items-center justify-center gap-4 overflow-hidden backdrop-blur-sm cursor-pointer transition-colors ${
                    isDarkTheme
                      ? "bg-[#111111]/80 border-white/5 hover:bg-[#1a1a1a]"
                      : "bg-white border-black/5 hover:bg-zinc-50"
                  }`}
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <motion.img
                      src={tool.gambar}
                      alt={tool.nama}
                      className="w-10 h-10 object-contain relative z-10"
                      whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center relative z-10">
                    <h4 className="font-bold text-sm tracking-wide leading-tight line-clamp-1">
                      {tool.nama}
                    </h4>
                    <p
                      className={`text-[9px] font-bold tracking-widest uppercase mt-1.5 ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                    >
                      {tool.ket}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Indikator scroll khusus mobile */}
            <div className="flex items-center justify-center gap-2 mt-2 md:hidden text-[10px] font-bold tracking-widest uppercase text-zinc-500">
              <i className="ri-arrow-left-line animate-pulse"></i> Geser Tools{" "}
              <i className="ri-arrow-right-line animate-pulse"></i>
            </div>
          </motion.div>
        </section>

        {/* --- 6. PROJECTS SECTION (INTERAKTIF SCROLL HORIZONTAL) --- */}
        <section
          id="projects"
          className={`py-24 border-t relative overflow-hidden scroll-mt-28 ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none bg-blue-500/10"></div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="relative z-10"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-6 md:px-0">
              <div className="text-center md:text-left">
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
                >
                  Proyek Pilihan
                </motion.h2>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`text-base md:text-lg max-w-xl ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  Kumpulan karya terbaik saya dalam membangun pengalaman
                  digital. Geser untuk menjelajahi lebih banyak proyek.
                </motion.p>
              </div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="hidden md:flex items-center gap-3"
              >
                <button
                  onClick={() => scrollCarousel("left")}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all hover:-translate-x-1 hover:scale-105 active:scale-95 ${isDarkTheme ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "border-black/20 bg-black/5 text-black hover:bg-black/10"}`}
                >
                  <i className="ri-arrow-left-s-line text-2xl"></i>
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all hover:translate-x-1 hover:scale-105 active:scale-95 ${isDarkTheme ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "border-black/20 bg-black/5 text-black hover:bg-black/10"}`}
                >
                  <i className="ri-arrow-right-s-line text-2xl"></i>
                </button>
              </motion.div>
            </div>

            <div className="relative w-full">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-6 pb-12 pt-4 px-6 md:px-0 snap-x snap-mandatory cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
              >
                {listProyek.map((proyek) => (
                  <motion.div
                    key={proyek.id}
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ y: -8 }}
                    className={`shrink-0 snap-center w-[85vw] md:w-[45vw] lg:w-[400px] group flex flex-col p-5 md:p-6 rounded-[2.5rem] border transition-all duration-500 ${isDarkTheme ? "bg-[#111] border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]" : "bg-white border-black/5 hover:border-black/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"}`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-800 mb-6 border border-white/5">
                      <img
                        src={proyek.gambar}
                        alt={proyek.nama}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                    <div className="flex flex-col flex-grow px-2">
                      <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {proyek.nama}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-4 line-clamp-3 ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                      >
                        {proyek.desk}
                      </p>
                      <div
                        className={`text-[10px] font-bold tracking-widest uppercase mb-8 flex items-center gap-1 transition-colors cursor-pointer ${isDarkTheme ? "text-zinc-500 group-hover:text-white" : "text-zinc-400 group-hover:text-black"}`}
                      >
                        READ MORE <i className="ri-arrow-down-s-line"></i>
                      </div>
                      <div
                        className={`mt-auto flex items-center justify-between pt-6 border-t ${isDarkTheme ? "border-white/5" : "border-black/5"}`}
                      >
                        <div className="flex items-center -space-x-3">
                          {proyek.tools.slice(0, 4).map((tool, i) => (
                            <div
                              key={i}
                              title={tool}
                              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-[10px] font-bold z-${40 - i * 10} transition-transform hover:-translate-y-2 hover:z-50 ${isDarkTheme ? "bg-zinc-900 border-[#0a0a0a] text-white" : "bg-zinc-100 border-white text-black"}`}
                            >
                              {tool.substring(0, 2)}
                            </div>
                          ))}
                          {proyek.tools.length > 4 && (
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-[10px] font-bold z-0 ${isDarkTheme ? "bg-zinc-800 border-[#0a0a0a] text-zinc-400" : "bg-zinc-200 border-white text-zinc-600"}`}
                            >
                              +{proyek.tools.length - 4}
                            </div>
                          )}
                        </div>
                        <a
                          href="#"
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-all hover:scale-105 ${isDarkTheme ? "bg-white/5 border-white/10 hover:bg-white text-white hover:text-black" : "bg-black/5 border-black/10 hover:bg-black text-black hover:text-white"}`}
                        >
                          Preview <i className="ri-external-link-line"></i>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 md:hidden text-xs font-bold tracking-widest uppercase text-zinc-500">
              <i className="ri-arrow-left-line animate-pulse"></i> Geser{" "}
              <i className="ri-arrow-right-line animate-pulse"></i>
            </div>
          </motion.div>
        </section>

        {/* ========================================= */}
        {/* 7. CONTACT SECTION (Modern 2-Column Split)  */}
        {/* ========================================= */}
        <section
          id="contact"
          className={`py-32 relative overflow-hidden border-t scroll-mt-28 ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
        >
          {/* Menghapus blur besar pemicu lag, diganti spotlight statis kecil */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none bg-blue-500"></div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              {/* KOLOM KIRI: Teks & Info Kontak Cepat */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={stagger}
                className="flex flex-col gap-8"
              >
                <div>
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span
                      className={`w-8 h-px ${isDarkTheme ? "bg-white/30" : "bg-black/30"}`}
                    ></span>
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${isDarkTheme ? "text-zinc-500" : "text-zinc-500"}`}
                    >
                      GET IN TOUCH
                    </span>
                  </motion.div>
                  <motion.h2
                    variants={fadeUp}
                    className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
                  >
                    Let's Start <br className="hidden md:block" /> Talking.
                  </motion.h2>
                  <motion.p
                    variants={fadeUp}
                    className={`text-base md:text-lg max-w-md leading-relaxed ${isDarkTheme ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    Punya ide proyek yang menarik, mencari partner kolaborasi,
                    atau sekadar ingin menyapa? Jangan ragu untuk menghubungi
                    saya.{" "}
                    <em className={isDarkTheme ? "text-white" : "text-black"}>
                      *My inbox is always open.*
                    </em>
                  </motion.p>
                </div>

                <motion.div
                  variants={fadeUp}
                  className="flex flex-col gap-6 mt-4"
                >
                  <div
                    className={`group flex items-center gap-6 pb-6 border-b ${isDarkTheme ? "border-white/10" : "border-black/10"}`}
                  >
                    <div
                      className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${isDarkTheme ? "bg-[#111] border-white/10 group-hover:border-white/50" : "bg-white border-black/10 shadow-sm"}`}
                    >
                      <i
                        className={`ri-mail-line text-xl transition-colors duration-300 ${isDarkTheme ? "text-zinc-500 group-hover:text-white" : "text-zinc-500 group-hover:text-black"}`}
                      ></i>
                    </div>
                    <div>
                      <p
                        className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                      >
                        DIRECT EMAIL
                      </p>
                      <a
                        href="mailto:iqbaliqbalnew15286@gmail.com"
                        className="text-lg font-bold tracking-wide hover:underline underline-offset-4"
                      >
                        iqbaliqbalnew15286@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6">
                    <div
                      className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${isDarkTheme ? "bg-[#111] border-white/10 group-hover:border-white/50" : "bg-white border-black/10 shadow-sm"}`}
                    >
                      <i
                        className={`ri-map-pin-line text-xl transition-colors duration-300 ${isDarkTheme ? "text-zinc-500 group-hover:text-white" : "text-zinc-500 group-hover:text-black"}`}
                      ></i>
                    </div>
                    <div>
                      <p
                        className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isDarkTheme ? "text-zinc-500" : "text-zinc-400"}`}
                      >
                        CURRENT LOCATION
                      </p>
                      <p className="text-lg font-bold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Bogor, Indonesia
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* KOLOM KANAN: Formulir Interaktif / Kotak Pesan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div
                  className={`w-full p-8 md:p-10 rounded-[2.5rem] border shadow-2xl relative ${isDarkTheme ? "bg-[#111] border-white/10" : "bg-white border-black/10"}`}
                >
                  <div
                    className={`flex p-1.5 rounded-2xl mb-8 ${isDarkTheme ? "bg-[#0a0a0a] border border-white/5" : "bg-zinc-100 border border-black/5"}`}
                  >
                    <button
                      onClick={() => setContactMethod("email")}
                      className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase rounded-xl transition-all ${contactMethod === "email" ? (isDarkTheme ? "bg-[#1f1f1f] text-white shadow-sm" : "bg-white text-black shadow-sm") : isDarkTheme ? "text-zinc-500 hover:text-white" : "text-zinc-500 hover:text-black"}`}
                    >
                      <i className="ri-mail-send-line mr-2"></i> Standard Email
                    </button>
                    <button
                      onClick={() => setContactMethod("wa")}
                      className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase rounded-xl transition-all ${contactMethod === "wa" ? (isDarkTheme ? "bg-[#1f1f1f] text-green-400 shadow-sm border border-green-500/20" : "bg-white text-green-600 shadow-sm border border-green-500/20") : isDarkTheme ? "text-zinc-500 hover:text-white" : "text-zinc-500 hover:text-black"}`}
                    >
                      <i className="ri-whatsapp-line mr-2"></i> WhatsApp
                    </button>
                  </div>

                  <form
                    className="flex flex-col gap-6"
                    onSubmit={
                      contactMethod === "wa"
                        ? handleWhatsAppSubmit
                        : (e) => e.preventDefault()
                    }
                  >
                    <div className="flex flex-col gap-2">
                      <label
                        className={`text-[10px] font-bold tracking-widest uppercase ml-1 ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}
                      >
                        What's your name?
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all text-sm font-medium ${isDarkTheme ? "bg-[#0a0a0a] border-white/10 focus:border-white/30 text-white placeholder-zinc-700" : "bg-zinc-50 border-black/10 focus:border-black/30 text-black placeholder-zinc-400"}`}
                      />
                    </div>

                    <AnimatePresence>
                      {contactMethod === "email" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col gap-2 overflow-hidden"
                        >
                          <label
                            className={`text-[10px] font-bold tracking-widest uppercase ml-1 ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}
                          >
                            Your email address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="john@example.com"
                            className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all text-sm font-medium ${isDarkTheme ? "bg-[#0a0a0a] border-white/10 focus:border-white/30 text-white placeholder-zinc-700" : "bg-zinc-50 border-black/10 focus:border-black/30 text-black placeholder-zinc-400"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-2">
                      <label
                        className={`text-[10px] font-bold tracking-widest uppercase ml-1 ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}
                      >
                        What are you interested in?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.interest}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              interest: e.target.value,
                            })
                          }
                          className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all text-sm font-medium appearance-none cursor-pointer ${isDarkTheme ? "bg-[#0a0a0a] border-white/10 focus:border-white/30 text-white" : "bg-zinc-50 border-black/10 focus:border-black/30 text-black"}`}
                        >
                          <option value="Web Development">
                            Web Development
                          </option>
                          <option value="Game Development">
                            Game Development
                          </option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Just saying hi!">
                            Just saying hi!
                          </option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500"></i>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        className={`text-[10px] font-bold tracking-widest uppercase ml-1 ${isDarkTheme ? "text-zinc-400" : "text-zinc-500"}`}
                      >
                        Message
                      </label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell me about your project, timeline, or just say hello..."
                        className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all text-sm font-medium resize-none ${isDarkTheme ? "bg-[#0a0a0a] border-white/10 focus:border-white/30 text-white placeholder-zinc-700" : "bg-zinc-50 border-black/10 focus:border-black/30 text-black placeholder-zinc-400"}`}
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-5 rounded-2xl font-black tracking-widest uppercase text-xs mt-2 flex justify-center items-center gap-2 transition-all duration-300 ${contactMethod === "wa" ? "bg-green-500 hover:bg-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.2)]" : isDarkTheme ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}
                    >
                      {contactMethod === "wa"
                        ? "Send Message via WA"
                        : "Send To Inbox"}{" "}
                      <i
                        className={
                          contactMethod === "wa"
                            ? "ri-whatsapp-line text-lg"
                            : "ri-send-plane-fill text-lg"
                        }
                      ></i>
                    </motion.button>

                    <AnimatePresence>
                      {contactMethod === "wa" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[10px] text-center text-zinc-500 mt-[-10px]"
                        >
                          *You will be redirected to WhatsApp to send the
                          message.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================= */}
      {/* 8. FOOTER SECTION                           */}
      {/* ========================================= */}
      <footer
        className={`relative z-20 pt-24 pb-8 md:pb-12 overflow-hidden ${isDarkTheme ? "bg-[#0a0a0a]" : "bg-zinc-100"}`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-px ${isDarkTheme ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" : "bg-gradient-to-r from-transparent via-black/20 to-transparent"}`}
        ></div>

        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-8 flex flex-col gap-20">
          <div className="relative flex flex-col items-center justify-center text-center py-10">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`text-[22vw] md:text-[18vw] font-black tracking-tighter leading-none select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkTheme ? "text-white/[0.03]" : "text-black/[0.03]"}`}
            >
              IQBAL.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              <h3 className="text-3xl md:text-5xl font-black tracking-tight">
                Got a project?
              </h3>
              <a
                href="#contact"
                className={`group flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold tracking-widest uppercase text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 ${isDarkTheme ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}
              >
                Let's Talk{" "}
                <i className="ri-arrow-right-up-line text-lg group-hover:rotate-45 transition-transform"></i>
              </a>
            </motion.div>
          </div>

          <div
            className={`w-full h-px ${isDarkTheme ? "bg-white/10" : "bg-black/10"}`}
          ></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <div className="flex flex-col items-center md:items-start gap-1.5 w-full md:w-1/3">
              <p
                className={`text-[10px] font-medium tracking-widest uppercase flex items-center gap-2 ${isDarkTheme ? "text-zinc-600" : "text-zinc-400"}`}
              >
                &copy; {new Date().getFullYear()} IQBAL. All Rights Reserved.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 w-full md:w-1/3">
              {["github-fill", "linkedin-fill", "instagram-line"].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="https://www.instagram.com/iqbaalll.mm"
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 ${isDarkTheme ? "border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5" : "border-black/10 text-zinc-500 hover:text-black hover:border-black/30 hover:bg-black/5"}`}
                  >
                    <i className={`ri-${icon} text-xl`}></i>
                  </a>
                ),
              )}
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-1/3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`group flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${isDarkTheme ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black"}`}
              >
                Kembali ke Atas{" "}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all group-hover:-translate-y-1 ${isDarkTheme ? "border-white/20 bg-white/10 text-white" : "border-black/20 bg-black/10 text-black"}`}
                >
                  <i className="ri-arrow-up-line text-xs"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* --- 9. FLOATING COMPONENT (Spotify) --- */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[110] flex">
        <SpotifyNowPlaying />
      </div>
    </div>
  );
}

export default App;
