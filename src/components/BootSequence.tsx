"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "INITIALIZING KERNEL...",
  "LOADING CORE DEPENDENCIES... [OK]",
  "MOUNTING FILE SYSTEM... [OK]",
  "ESTABLISHING SECURE CONNECTION...",
  "REROUTING ENCRYPTION PROTOCOLS... [OK]",
  "STARTING MICROSERVICES MAP...",
  "BOOTING AL_SHAHRIAH.EXE...",
  "SYSTEM ONLINE."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let isActive = true;
    
    const showNextLog = () => {
      if (!isActive) return;
      
      if (currentIndex < bootLogs.length) {
        const nextLog = bootLogs[currentIndex];
        if (nextLog) {
          setVisibleLogs(prev => [...prev, nextLog]);
        }
        currentIndex++;
        timeoutId = setTimeout(showNextLog, 100 + Math.random() * 300);
      } else {
        timeoutId = setTimeout(() => {
          if (!isActive) return;
          setIsBooting(false);
          setTimeout(() => {
            if (isActive) onComplete();
          }, 500); 
        }, 1000);
      }
    };

    showNextLog();

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-start justify-end p-8 md:p-16 font-mono text-sm md:text-lg text-tech-cyan crt-overlay"
        >
          <div className="max-w-3xl w-full">
            {visibleLogs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2 glitch-text"
              >
                {log?.includes("[OK]") ? (
                  <span>
                    {log.split("[OK]")[0]}
                    <span className="text-green-500 font-bold">[OK]</span>
                  </span>
                ) : (
                  log
                )}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-3 h-5 bg-tech-cyan mt-1 inline-block"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
