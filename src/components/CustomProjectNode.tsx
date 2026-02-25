"use client";

import { Handle, Position, NodeProps } from 'reactflow';
import { TerminalSquare, Database, Globe, Cpu, Smartphone } from 'lucide-react';
import clsx from 'clsx';

// Icon Map for different project types
const iconMap = {
  ecommerce: TerminalSquare,
  chat: Globe,
  ai: Cpu,
  database: Database,
  mobile: Smartphone
};

export default function CustomProjectNode({ data, selected }: NodeProps) {
  const Icon = iconMap[data.icon as keyof typeof iconMap] || TerminalSquare;

  return (
    <div 
      className={clsx(
        "glass border-2 rounded-xl p-4 min-w-[250px] transition-all duration-300 relative group",
        selected ? "border-tech-cyan box-glow-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "border-surface-border hover:border-tech-cyan/50"
      )}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-surface border-2 border-tech-purple rounded-none" 
      />
      
      <div className="flex items-start gap-3">
        <div className={clsx(
          "p-2 rounded-lg relative overflow-hidden",
          data.status === 'online' ? "bg-tech-cyan/10" : "bg-surface-hover"
        )}>
          <Icon className={clsx(
            "w-5 h-5 relative z-10",
            data.status === 'online' ? "text-tech-cyan" : "text-gray-400"
          )} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-foreground font-bold text-sm tracking-tight">{data.label}</h3>
            <span className={clsx(
              "text-[10px] px-1.5 py-0.5 rounded font-mono",
              data.status === 'online' ? "bg-green-500/10 text-green-400" : "bg-gray-800 text-gray-400"
            )}>
              {data.status.toUpperCase()}
            </span>
          </div>
          
          <p className="text-xs text-foreground/70 mb-3 line-clamp-2">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {data.stack?.map((tech: string) => (
              <span 
                key={tech} 
                className="text-[10px] px-2 py-0.5 rounded bg-surface-hover text-tech-cyan border border-tech-cyan/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-surface border-2 border-tech-cyan rounded-none" 
      />
    </div>
  );
}
