"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Terminal, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

type Theme = 'default' | 'protocol' | 'matrix';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('default');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Remove all theme classes first
    document.body.classList.remove('theme-protocol', 'theme-matrix');
    
    // Add the selected theme class if it's not default
    if (theme !== 'default') {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-14 right-0 mb-2 glass p-2 rounded-xl flex flex-col gap-2 min-w-[150px]"
          >
            <div className="text-xs font-mono text-foreground/50 px-2 pb-1 border-b border-surface-border">
              // OVERRIDE_PROTOCOLS
            </div>
            <button
              onClick={() => { setTheme('default'); setIsOpen(false); }}
              className={clsx(
                "flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg transition-colors text-left",
                theme === 'default' ? "bg-tech-cyan/20 text-tech-cyan" : "hover:bg-surface-hover text-foreground/70"
              )}
            >
              <Terminal className="w-3 h-3" /> Core Blue
            </button>
            <button
              onClick={() => { setTheme('matrix'); setIsOpen(false); }}
              className={clsx(
                "flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg transition-colors text-left",
                theme === 'matrix' ? "bg-green-500/20 text-green-500" : "hover:bg-surface-hover text-foreground/70"
              )}
            >
              <Terminal className="w-3 h-3 text-green-500" /> Matrix Green
            </button>
            <button
              onClick={() => { setTheme('protocol'); setIsOpen(false); }}
              className={clsx(
                "flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg transition-colors text-left",
                theme === 'protocol' ? "bg-red-500/20 text-red-500" : "hover:bg-surface-hover text-foreground/70"
              )}
            >
              <ShieldAlert className="w-3 h-3 text-red-500" /> Protocol Red
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/50 hover:text-tech-cyan hover:border-tech-cyan/50 transition-colors shadow-lg"
      >
        <Settings2 className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
