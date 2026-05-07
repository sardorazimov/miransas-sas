"use client";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.4, ease: "easeInOut" as const },
      opacity: { delay, duration: 0.01 },
    },
  }),
};

function fade(delay: number, duration = 0.6) {
  return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration } };
}

const MESH_NODES = [
  { cx: 120, cy: 220 }, { cx: 280, cy: 160 }, { cx: 460, cy: 200 },
  { cx: 180, cy: 370 }, { cx: 380, cy: 300 }, { cx: 560, cy: 340 },
  { cx: 100, cy: 510 }, { cx: 300, cy: 460 }, { cx: 520, cy: 490 },
];

const MESH_EDGES = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
  [3, 6], [4, 7], [5, 8], [6, 7], [7, 8],
];

export function GpuMeshScene() {
  return (
    <svg viewBox="0 0 800 700" fill="none" aria-hidden className="w-full h-full">
      <defs>
        <filter id="mesh-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {MESH_EDGES.map(([a, b], i) => (
          <path
            key={i}
            id={`mesh-edge-${i}`}
            d={`M ${MESH_NODES[a].cx},${MESH_NODES[a].cy} L ${MESH_NODES[b].cx},${MESH_NODES[b].cy}`}
          />
        ))}
      </defs>

      {/* Mesh edges */}
      <motion.g initial="hidden" animate="visible">
        {MESH_EDGES.map(([a, b], i) => (
          <motion.path
            key={i}
            d={`M ${MESH_NODES[a].cx},${MESH_NODES[a].cy} L ${MESH_NODES[b].cx},${MESH_NODES[b].cy}`}
            stroke="white" strokeWidth={0.85} strokeOpacity={0.3}
            filter="url(#mesh-glow)" vectorEffect="non-scaling-stroke"
            variants={draw} custom={i * 0.05}
          />
        ))}
      </motion.g>

      {/* Data packets on edges */}
      {MESH_EDGES.slice(0, 6).map((_, i) => (
        <circle key={i} r={2.5} fill="white" fillOpacity={0.8}>
          <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${1.5 + i * 0.4}s`}>
            <mpath href={`#mesh-edge-${i}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Mesh nodes */}
      <motion.g {...fade(0.3)}>
        {MESH_NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={12} stroke="white" strokeWidth={1.1} strokeOpacity={0.55} filter="url(#mesh-glow)" />
            <circle cx={n.cx} cy={n.cy} r={7} stroke="white" strokeWidth={0.8} strokeOpacity={0.35} />
            <circle cx={n.cx} cy={n.cy} r={3} fill="white" fillOpacity={0.7} />
          </g>
        ))}
      </motion.g>

      {/* Control Unit (central hub) — same as OrchestratorScene */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
        <motion.g initial="hidden" animate="visible">
          <motion.path d="M 580,250 L 740,250 L 740,390 L 580,390 Z" stroke="white" strokeWidth={1.2} strokeOpacity={0.72} filter="url(#mesh-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.5} />
          <motion.path d="M 580,250 L 740,250 L 760,230 L 600,230 Z" stroke="white" strokeWidth={1.2} strokeOpacity={0.62} filter="url(#mesh-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.52} />
          <motion.path d="M 740,250 L 740,390 L 760,370 L 760,230 Z" stroke="white" strokeWidth={1.2} strokeOpacity={0.52} filter="url(#mesh-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.54} />
          {/* Sliders */}
          <motion.path d="M 620,268 L 620,374" stroke="white" strokeWidth={0.9} strokeOpacity={0.28} variants={draw} custom={0.56} />
          <motion.path d="M 660,268 L 660,374" stroke="white" strokeWidth={0.9} strokeOpacity={0.28} variants={draw} custom={0.58} />
          <motion.path d="M 700,268 L 700,374" stroke="white" strokeWidth={0.9} strokeOpacity={0.28} variants={draw} custom={0.60} />
          <circle cx={620} cy={350} r={6} stroke="white" strokeWidth={1.5} strokeOpacity={0.85} filter="url(#mesh-glow)" />
          <circle cx={620} cy={350} r={2.5} fill="white" fillOpacity={0.7} />
          <circle cx={660} cy={320} r={6} stroke="white" strokeWidth={1.5} strokeOpacity={0.85} filter="url(#mesh-glow)" />
          <circle cx={660} cy={320} r={2.5} fill="white" fillOpacity={0.7} />
          <circle cx={700} cy={285} r={6} stroke="white" strokeWidth={1.5} strokeOpacity={0.85} filter="url(#mesh-glow)" />
          <circle cx={700} cy={285} r={2.5} fill="white" fillOpacity={0.7} />
        </motion.g>

        {/* Starburst on top face */}
        <motion.g {...fade(0.8)}>
          <g transform="translate(670, 239)">
            <g>
              {/* @ts-ignore */}
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30 * Math.PI) / 180;
                return <line key={i} x1={7 * Math.cos(a)} y1={7 * Math.sin(a)} x2={20 * Math.cos(a)} y2={20 * Math.sin(a)} stroke="white" strokeWidth={1.1} strokeOpacity={0.72} filter="url(#mesh-glow)" />;
              })}
              <circle cx={0} cy={0} r={3.5} fill="white" fillOpacity={0.85} />
            </g>
          </g>
        </motion.g>
      </motion.g>

      {/* Connection lines to control unit */}
      <motion.g initial="hidden" animate="visible">
        <motion.path d="M 460,200 C 520,220 560,240 580,260" stroke="white" strokeWidth={1} strokeOpacity={0.4} filter="url(#mesh-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.45} />
        <motion.path d="M 520,490 C 550,460 565,430 575,395" stroke="white" strokeWidth={1} strokeOpacity={0.4} filter="url(#mesh-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.47} />
      </motion.g>

      {/* Curved label */}
      <defs>
        <path id="mesh-curve-text" d="M 50,640 Q 400,685 750,640" />
      </defs>
      <motion.g {...fade(1.0)}>
        <text fill="white" fillOpacity={0.4} fontSize={10.5} fontFamily="var(--font-geist-mono)" letterSpacing={0.5}>
          <textPath href="#mesh-curve-text">GPU Mesh Network — Dynamic Partitioning — Fault Tolerant Scheduling</textPath>
        </text>
      </motion.g>
    </svg>
  );
}
