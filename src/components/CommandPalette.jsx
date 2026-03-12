import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands = [
  { id: 1, name: "Home", section: "hero", icon: "ri-home-4-line" },
  { id: 2, name: "About", section: "about", icon: "ri-user-line" },
  { id: 3, name: "Projects", section: "projects", icon: "ri-folder-line" },
  { id: 4, name: "Tools", section: "tools", icon: "ri-tools-line" },
  { id: 5, name: "Contact", section: "contact", icon: "ri-mail-line" },
  { id: 6, name: "GitHub", url: "https://github.com", icon: "ri-github-line" },
  {
    id: 7,
    name: "Instagram",
    url: "https://instagram.com",
    icon: "ri-instagram-line",
  },
  {
    id: 8,
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "ri-linkedin-box-line",
  },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const executeCommand = (command) => {
    if (command.url) {
      window.open(command.url, "_blank");
    } else {
      const element = document.getElementById(command.section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 lg:bottom-6 left-4 lg:left-6 z-40 hidden md:flex items-center gap-1 lg:gap-2 text-zinc-500 text-xs lg:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <kbd className="px-1.5 lg:px-2 py-1 bg-zinc-800 rounded text-xs border border-zinc-700">
          Ctrl
        </kbd>
        <span>+</span>
        <kbd className="px-1.5 lg:px-2 py-1 bg-zinc-800 rounded text-xs border border-zinc-700">
          K
        </kbd>
        <span className="ml-1 hidden lg:inline">to search</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[101]"
            >
              <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-3 lg:py-4 border-b border-zinc-800">
                  <i className="ri-search-line text-zinc-400 text-lg lg:text-xl"></i>
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Search pages, projects, contacts..."
                    className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm lg:text-lg"
                  />
                  <kbd className="px-1.5 lg:px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-500">
                    ESC
                  </kbd>
                </div>

                <div className="max-h-60 lg:max-h-80 overflow-y-auto py-2">
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map((cmd, index) => (
                      <motion.button
                        key={cmd.id}
                        onClick={() => executeCommand(cmd)}
                        className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 text-left transition-colors ${
                          index === selectedIndex
                            ? "bg-violet-600/20 text-violet-300"
                            : "text-zinc-300 hover:bg-zinc-800"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <i className={`${cmd.icon} text-lg lg:text-xl`}></i>
                        <span className="flex-1 text-sm lg:text-base">
                          {cmd.name}
                        </span>
                        {index === selectedIndex && (
                          <span className="text-xs text-zinc-500 hidden lg:inline">
                            Enter
                          </span>
                        )}
                      </motion.button>
                    ))
                  ) : (
                    <div className="px-4 py-6 lg:py-8 text-center text-zinc-500 text-sm lg:text-base">
                      No results found
                    </div>
                  )}
                </div>

                <div className="px-3 lg:px-4 py-2 lg:py-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded">
                        Up/Down
                      </kbd>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded">
                        Enter
                      </kbd>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
