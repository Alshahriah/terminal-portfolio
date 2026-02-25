"use client";

import { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomProjectNode from './CustomProjectNode';
import AnimatedEdge from './AnimatedEdge';
import { motion } from 'framer-motion';

const initialNodes: Node[] = [
  {
    id: 'core',
    type: 'input',
    data: { label: 'CORE SYSTEM' },
    position: { x: 400, y: 50 },
    className: 'glass text-tech-cyan font-bold font-mono border-tech-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)] !w-[200px] !text-center !py-4'
  },
  {
    id: 'ecommerce',
    type: 'custom',
    position: { x: 100, y: 250 },
    data: { 
      label: 'E-Commerce Platform',
      description: 'A full-featured online store with payment integration, inventory management, and admin dashboard.',
      status: 'online',
      icon: 'ecommerce',
      stack: ['React', 'Node.js', 'MongoDB']
    },
  },
  {
    id: 'chat',
    type: 'custom',
    position: { x: 400, y: 350 },
    data: { 
      label: 'Real-time Chat App',
      description: 'A scalable messaging application with WebSocket support, group chats, and file sharing.',
      status: 'online',
      icon: 'chat',
      stack: ['Next.js', 'Socket.io', 'Redis']
    },
  },
  {
    id: 'ai',
    type: 'custom',
    position: { x: 700, y: 250 },
    data: { 
      label: 'AI Content Generator',
      description: 'SaaS tool leveraging OpenAI API to generate marketing copy and blog posts.',
      status: 'online',
      icon: 'ai',
      stack: ['Python', 'FastAPI', 'React']
    },
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e-core-ecom',
    source: 'core',
    target: 'ecommerce',
    type: 'custom',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' }
  },
  {
    id: 'e-core-chat',
    source: 'core',
    target: 'chat',
    type: 'custom',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' }
  },
  {
    id: 'e-core-ai',
    source: 'core',
    target: 'ai',
    type: 'custom',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }
  }
];

export default function MicroservicesMap() {
  const nodeTypes = useMemo(() => ({ custom: CustomProjectNode }), []);
  const edgeTypes = useMemo(() => ({ custom: AnimatedEdge }), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="w-full h-[600px] mt-8 rounded-2xl overflow-hidden glass relative"
    >
      <div className="absolute top-4 left-6 z-10 w-[min(100%,300px)] pointer-events-none">
        <h2 className="text-lg font-semibold text-foreground/90 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse"></span>
          {"// MICROSERVICES_MAP"}
        </h2>
        <p className="text-xs text-foreground/50 mt-1">Interactive system architecture detailing deployed projects and tech stacks.</p>
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-transparent"
        minZoom={0.5}
        maxZoom={2}
      >
        <Background color="#ffffff" gap={16} size={0.5} />
        <Controls showInteractive={false} className="!bg-surface !border-surface-border fill-foreground" />
      </ReactFlow>
    </motion.div>
  );
}
