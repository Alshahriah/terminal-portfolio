"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import Core3DElement from "./Core3DElement";

export default function CoreProcessor() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5 
      }}
      className="glass p-8 rounded-2xl max-w-2xl w-full relative overflow-hidden group"
    >
      {/* Animated glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-cyan/0 via-tech-cyan/5 to-tech-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Core3DElement />
          <div>
            <h1 className="text-2xl font-bold font-mono text-foreground tracking-tight">
              Al_Shahriah.exe
            </h1>
            <p className="text-tech-cyan text-sm font-mono flex items-center gap-2">
              <Activity className="w-3 h-3" /> System Primary Source
            </p>
          </div>
        </div>
        
        {/* Status Indicators */}
        <div className="flex flex-col items-end gap-1 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">LOC:</span>
            <span className="text-foreground">IND [India]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">STATUS:</span>
            <span className="text-tech-purple text-glow-purple">Open to OSS</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground/90 border-b border-surface-border pb-2">
          {"// CORE_OBJECTIVE"}
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          Full Stack Developer with a passion for building robust web applications and solving complex problems. 
          With extensive experience in both frontend and backend technologies, I specialize in creating seamless digital experiences. 
          I focus on writing clean, maintainable code and architecting scalable systems.
        </p>
      </div>

      {/* Decorative circuitry lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tech-cyan/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-tech-purple/30 to-transparent"></div>
    </motion.div>
  );
}
