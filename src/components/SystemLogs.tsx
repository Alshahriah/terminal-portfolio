"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LogEntry {
  time: string;
  type: string;
  message: string | React.ReactNode;
}

const initialLogs: LogEntry[] = [
  { time: "09:00:01", type: "INFO", message: "System initialization complete. Modules loaded." },
  { time: "09:00:15", type: "SUCCESS", message: "Architected and deployed microservices handling high-volume traffic." },
  { time: "09:01:42", type: "INFO", message: "Active contributor to major web development ecosystems." },
  { time: "09:03:10", type: "OPTIMIZATION", message: "Improved application load times by 40% through advanced caching strategies and code splitting." },
  { time: "09:04:00", type: "SYSTEM", message: "Type 'help' to see available commands." },
];

export default function SystemLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLog: LogEntry = { time, type: "USER", message: `> ${cmd}` };
    
    let response: LogEntry;
    
    switch (cmd.toLowerCase().trim()) {
      case 'help':
        response = { 
          time, type: "SYSTEM", 
          message: "Available commands: help, whoami, clear, contact, projects" 
        };
        break;
      case 'whoami':
        response = {
          time, type: "INFO",
          message: "Al Shahriah. Full Stack Developer. Expert in Distributed Systems, Frontend Architecture, and Cloud Native DevOps."
        };
        break;
      case 'contact':
        response = {
          time, type: "INFO",
          message: "Location: India. Open to exciting OSS or architectural roles."
        };
        break;
      case 'projects':
        response = {
          time, type: "SUCCESS",
          message: "1. E-Commerce Platform | 2. Real-time Chat App | 3. AI Content Generator. See Microservices Map below for live architecture."
        };
        break;
      case 'clear':
        setLogs([]);
        return;
      case '':
        return;
      default:
        response = {
          time, type: "ERROR",
          message: `Command not found: ${cmd}. Type 'help' for a list of commands.`
        };
    }

    setLogs(prev => [...prev, newLog, response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      // Clicking anywhere on the terminal focuses the input
      onClick={() => inputRef.current?.focus()}
      className="glass rounded-2xl w-full max-w-2xl mt-8 overflow-hidden font-mono text-sm border border-surface-border shadow-2xl relative cursor-text text-left"
    >
      {/* Terminal Header */}
      <div className="bg-surface-hover px-4 py-2 border-b border-surface-border flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-foreground/70">
          <Terminal className="w-4 h-4" />
          <span>interactive_shell.exe</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-4 h-[250px] overflow-y-auto space-y-2 text-foreground/80 scrollbar-thin scrollbar-thumb-surface-border scrollbar-track-transparent"
      >
        {logs.map((log, index) => (
          <div key={index} className="flex gap-3 items-start">
            <span className="text-gray-500 shrink-0">[{log.time}]</span>
            <span className={`shrink-0 font-bold ${
              log.type === 'SUCCESS' ? 'text-green-400' :
              log.type === 'OPTIMIZATION' ? 'text-tech-cyan' :
              log.type === 'SYSTEM' ? 'text-tech-purple' :
              log.type === 'USER' ? 'text-white' :
              log.type === 'ERROR' ? 'text-red-500' :
              'text-gray-400'
            }`}>
              [{log.type}]
            </span>
            <span className={log.type === 'USER' ? 'text-white' : 'text-gray-300'}>
              {log.message}
            </span>
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex gap-3 items-center mt-2">
          <span className="text-gray-500 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
          <span className="shrink-0 font-bold text-tech-cyan">[INPUT]</span>
          <span className="text-white mr-1">&gt;</span>
          <input 
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white w-full caret-tech-cyan"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
    </motion.div>
  );
}
