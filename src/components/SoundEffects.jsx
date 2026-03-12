import { useEffect, useCallback } from "react";
import useSound from "use-sound";

// Placeholder - ganti dengan file suara asli
// Kamu bisa download suara click dari: https://www.soundjay.com/buttons/sounds/
// letakan file di public/sounds/click.mp3

const SoundEffects = ({ enabled = true }) => {
  // Note: Kamu perlu menambahkan file suara di public/sounds/
  // Untuk sekarang, kita bypass dulu karena belum ada file suara

  const playClick = useCallback(() => {
    if (enabled) {
      //gsap.globalTimeline.timeScale(1.2);
      // Nanti bisa pakai: play()
      console.log("Click sound triggered");
    }
  }, [enabled]);

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        playClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playClick]);

  return null;
};

export default SoundEffects;
