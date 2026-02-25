"use client";

import { motion } from "framer-motion";
import { Server, Layout, Code2, Cloud } from "lucide-react";
import clsx from "clsx";

interface Skill {
  name: string;
  percentage: number;
  icon: React.ElementType<{ className?: string }>;
  color: "cyan" | "purple" | "green" | "emerald";
}

const skills: Skill[] = [
  { name: "Backend & Systems", percentage: 95, icon: Server, color: "cyan" },
  { name: "Frontend Arch", percentage: 90, icon: Layout, color: "purple" },
  { name: "Software Dev", percentage: 85, icon: Code2, color: "emerald" },
  { name: "DevOps & Cloud", percentage: 80, icon: Cloud, color: "cyan" }
];

const CircularProgress = ({ value, color, icon: Icon }: { value: number, color: string, icon: React.ElementType<{ className?: string }> }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorMap = {
    cyan: "text-tech-cyan stroke-tech-cyan",
    purple: "text-tech-purple stroke-tech-purple",
    emerald: "text-emerald-400 stroke-emerald-400",
    green: "text-green-400 stroke-green-400",
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-24 h-24">
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-surface-border"
        />
        {/* Progress circle */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          className={clsx(colorMap[color as keyof typeof colorMap], "drop-shadow-lg")}
          style={{ strokeLinecap: "round" }}
        />
      </svg>
      {/* Center Icon */}
      <div className={clsx("absolute", colorMap[color as keyof typeof colorMap].split(' ')[0])}>
        <Icon className={"w-6 h-6" as any} />
      </div>
    </div>
  );
};

export default function SystemHealth() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="glass p-6 rounded-2xl w-full max-w-2xl mt-8"
    >
      <div className="flex items-center justify-between mb-6 border-b border-surface-border pb-2">
        <h2 className="text-lg font-semibold text-foreground/90 font-mono">
          {"// SYSTEM_CAPACITY"}
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-mono text-green-500">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + (index * 0.2) }}
            className="flex flex-col items-center gap-3 group cursor-default"
          >
            <CircularProgress value={skill.percentage} color={skill.color} icon={skill.icon} />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground group-hover:text-tech-cyan transition-colors">
                {skill.name}
              </p>
              <p className="text-xs text-foreground/50 font-mono mt-1">
                {skill.percentage}% ALLOCATED
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
