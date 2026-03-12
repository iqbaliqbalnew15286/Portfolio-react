import HeroImage from "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

// =======================================================
// LIST TOOLS (BERDASARKAN GAMBAR KEAHLIAN YANG DIUNGGAH)
// Menggunakan Link CDN / SVG Otomatis (Tanpa Download)
// =======================================================
export const listTools = [
  {
    id: 1,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    nama: "HTML",
    ket: "Markup Language",
    dad: "100",
  },
  {
    id: 2,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    nama: "CSS",
    ket: "Style Sheet",
    dad: "200",
  },
  {
    id: 3,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    nama: "Java Script",
    ket: "Programming Language",
    dad: "300",
  },
  {
    id: 4,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    nama: "Tailwind",
    ket: "CSS Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    nama: "Bootstrap",
    ket: "CSS Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
    nama: "Canva",
    ket: "Design Tool",
    dad: "600",
  },
  {
    id: 7,
    // Logo khusus untuk Alpine JS dari library SVGL
    gambar: "https://svgl.app/library/alpinejs.svg",
    nama: "Alpine js",
    ket: "JS Framework",
    dad: "700",
  },
  {
    id: 8,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    nama: "Figma",
    ket: "UI/UX Design",
    dad: "800",
  },
  {
    id: 9,
    // Menggunakan ikon Postman (Standar Industri untuk API)
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    nama: "API",
    ket: "API Integration",
    dad: "900",
  },
  {
    id: 10,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    nama: "Laravel",
    ket: "PHP Framework",
    dad: "1000",
  },
  {
    id: 11,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    nama: "React",
    ket: "JS Library",
    dad: "1100",
  },
  {
    id: 12,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
    nama: "Wordpress",
    ket: "CMS",
    dad: "1200",
  },
  {
    id: 13,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    nama: "PHP",
    ket: "Backend Language",
    dad: "1300",
  },
  {
    id: 14,
    // Fetch otomatis logo asli dari website Laragon
    gambar: "https://icon.horse/icon/laragon.org",
    nama: "Laragon",
    ket: "Local Server",
    dad: "1400",
  },
  {
    id: 15,
    gambar: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    nama: "Github",
    ket: "Version Control",
    dad: "1500",
  },
];


// ==========================================
// LIST PROYEK (Tetap Menggunakan Import Gambar Lokal)
// ==========================================
import Proyek1 from "/assets/proyek/proyek1.webp";
import Proyek2 from "/assets/proyek/proyek2.webp";
import Proyek3 from "/assets/proyek/proyek3.webp";
import Proyek4 from "/assets/proyek/proyek4.webp";
import Proyek5 from "/assets/proyek/proyek5.webp";
import Proyek6 from "/assets/proyek/proyek6.webp";

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: "Website Sekolah",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["HTML", "CSS", "Javascript", "AOS"],
    dad: "200",
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Company Profile",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["HTML", "CSS", "Javascript", "AOS", "Swiper", "Lightbox Gallery"],
    dad: "300",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Web Pernikahan 2.0",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["Vite", "ReactJS", "TailwindCSS", "AOS"],
    dad: "400",
  },
  {
    id: 4,
    gambar: Proyek4,
    nama: "Website Course",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["Vite", "ReactJS", "Bootstrap", "AOS"],
    dad: "500",
  },
  {
    id: 5,
    gambar: Proyek5,
    nama: "Web Portfolio",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["HTML", "CSS", "Javascript", "Bootsrap"],
    dad: "600",
  },
  {
    id: 6,
    gambar: Proyek6,
    nama: "Company Profile 2.0",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["NextJS", "TailwindCSS", "Framermotion"],
    dad: "700",
  },
];