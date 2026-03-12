import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";

import "remixicon/fonts/remixicon.css";

// Providers
import { LanguageProvider } from "./components/LanguageContext";
import { ThemeProvider } from "./components/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <div className="container mx-auto px-4">
          <Navbar />
          <App />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
