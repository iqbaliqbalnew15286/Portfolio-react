import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const languages = {
  ID: "id",
  EN: "en",
};

const translations = {
  id: {
    // Navbar
    home: "Beranda",
    about: "Tentang",
    tools: "Tools",
    projects: "Proyek",
    contact: "Kontak",

    // Hero
    quote: "Kode yang indah, lahir dari ketekunan😊",
    hi: "Hi, saya Muhammad Iqbal",
    downloadCV: "Download CV",
    seeProjects: "Lihat Proyek",

    // About
    aboutTitle: "Tentang Saya",
    aboutDesc:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error maiores sunt iusto cupiditate impedit explicabo, ipsa accusantium ad laborum sed corrupti deserunt incidunt commodi debitis eveniet repellat, animi eius ex.",
    completedProjects: "Proyek Selesai",
    yearsExperience: "Tahun Pengalaman",

    // Tools
    toolsTitle: "Tools yang dipakai",
    toolsDesc:
      "Berikut ini beberapa tools yang biasa saya pakai untuk pembuatan website ataupun desain.",

    // Projects
    projectsTitle: "Proyek",
    projectsDesc: "Berikut ini beberapa Proyek yang telah saya buat",
    viewWebsite: "Lihat Website",
    clickToReact: "Klik untuk reaction!",
    reactions: "reactions",

    // Contact
    contactTitle: "Mari Berdiskusi!",
    contactDesc:
      "Punya ide proyek atau sekadar ingin menyapa? Silakan hubungi saya melalui platform di bawah ini.",

    // Footer
    footerText: "Dibuat dengan ❤️ dan React",

    // Loading
    loading: "Memuat...",
    nowPlaying: "Sedang Diputar",

    // Status
    available: "Tersedia untuk proyek baru",
  },
  en: {
    // Navbar
    home: "Home",
    about: "About",
    tools: "Tools",
    projects: "Projects",
    contact: "Contact",

    // Hero
    quote: "Beautiful code comes from perseverance😊",
    hi: "Hi, I'm Muhammad Iqbal",
    downloadCV: "Download CV",
    seeProjects: "See Projects",

    // About
    aboutTitle: "About Me",
    aboutDesc:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error maiores sunt iusto cupiditate impedit explicabo, ipsa accusantium ad laborum sed corrupti deserunt incidunt commodi debitis eveniet repellat, animi eius ex.",
    completedProjects: "Projects Completed",
    yearsExperience: "Years of Experience",

    // Tools
    toolsTitle: "Tools I Use",
    toolsDesc:
      "Here are some tools I commonly use for website development and design.",

    // Projects
    projectsTitle: "Projects",
    projectsDesc: "Here are some of the projects I've created",
    viewWebsite: "View Website",
    clickToReact: "Click to react!",
    reactions: "reactions",

    // Contact
    contactTitle: "Let's Connect!",
    contactDesc:
      "Have a project idea or just want to say hi? Feel free to reach me through the platforms below.",

    // Footer
    footerText: "Made with ❤️ and React",

    // Loading
    loading: "Loading...",
    nowPlaying: "Now Playing",

    // Status
    available: "Available for new projects",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved || languages.ID;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === languages.ID ? languages.EN : languages.ID,
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
