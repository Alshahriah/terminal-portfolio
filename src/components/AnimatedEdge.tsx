"use client";

import { BaseEdge, getBezierPath, EdgeProps } from 'reactflow';

export default function AnimatedEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      
      {/* Animated Glowing Packet */}
      <circle r="4" fill={style?.stroke || "#06b6d4"}>
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </>
  );
}
