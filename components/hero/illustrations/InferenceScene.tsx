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

const API_ENDPOINTS = [
  { x: 30, y: 120, label: "/v1/completions" },
  { x: 30, y: 220, label: "/v1/embeddings" },
  { x: 30, y: 320, label: "/v1/chat" },
  { x: 30, y: 420, label: "/v1/batch" },
];

export function InferenceScene() {
  return (
    <svg viewBox="0 0 800 700" fill="none" aria-hidden className="w-full h-full">
      <defs>
        <filter id="inf-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id="inf-line-0" d="M 195,120 C 280,160 340,220 360,260" />
        <path id="inf-line-1" d="M 195,220 C 270,240 330,255 360,265" />
        <path id="inf-line-2" d="M 195,320 C 270,310 335,295 360,280" />
        <path id="inf-line-3" d="M 195,420 C 270,390 340,355 360,310" />
        <path id="inf-out-0" d="M 505,270 C 570,260 620,250 670,240" />
        <path id="inf-out-1" d="M 505,290 C 570,300 620,320 670,360" />
        <path id="inf-curve-text" d="M 50,630 Q 400,672 750,630" />
      </defs>

      {/* ── API ENDPOINT BOXES ──────────────────────────────────────── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <motion.g initial="hidden" animate="visible">
          {API_ENDPOINTS.map((ep, i) => (
            <g key={i}>
              <motion.path
                d={`M 30,${ep.y - 18} L 195,${ep.y - 18} L 195,${ep.y + 18} L 30,${ep.y + 18} Z`}
                stroke="white" strokeWidth={1} strokeOpacity={0.45}
                filter="url(#inf-glow)" vectorEffect="non-scaling-stroke"
                variants={draw} custom={0.2 + i * 0.06}
              />
              <circle cx={46} cy={ep.y} r={3} fill="white" fillOpacity={0.65} />
              <text x={60} y={ep.y + 4} fill="white" fillOpacity={0.5} fontSize={9.5} fontFamily="var(--font-geist-mono)">
                {ep.label}
              </text>
              {/* Request count badge */}
              <motion.path
                d={`M 168,${ep.y - 10} L 192,${ep.y - 10} L 192,${ep.y + 10} L 168,${ep.y + 10} Z`}
                stroke="white" strokeWidth={0.6} strokeOpacity={0.3}
                variants={draw} custom={0.25 + i * 0.06}
              />
            </g>
          ))}
        </motion.g>
      </motion.g>

      {/* ── ROUTING LINES TO CONTROL UNIT ──────────────────────────── */}
      <motion.g initial="hidden" animate="visible">
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M 195,${API_ENDPOINTS[i].y} C 270,${240 + i * 20} 330,${255 + (3 - i) * 15} 360,${260 + (3 - i) * 15}`}
            stroke="white" strokeWidth={0.9} strokeOpacity={0.38}
            filter="url(#inf-glow)" vectorEffect="non-scaling-stroke"
            variants={draw} custom={0.35 + i * 0.05}
          />
        ))}
      </motion.g>

      {/* Data packets flowing in */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} r={2.5} fill="white" fillOpacity={0.85}>
          <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${1.5 + i * 0.5}s`}>
            <mpath href={`#inf-line-${i}`} />
          </animateMotion>
        </circle>
      ))}

      {/* ── CONTROL UNIT ──────────────────────────────────────────────── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
        <motion.g initial="hidden" animate="visible">
          <motion.path d="M 360,200 L 510,200 L 510,360 L 360,360 Z" stroke="white" strokeWidth={1.2} strokeOpacity={0.72} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.45} />
          <motion.path d="M 360,200 L 510,200 L 530,180 L 380,180 Z" stroke="white" strokeWidth={1.2} strokeOpacity={0.62} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.47} />
          <motion.path d="M 510,200 L 510,360 L 530,340 L 530,180 Z" stroke="white" strokeWidth={1.2} strokeOpacity={0.52} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.49} />
          {/* Sliders */}
          <motion.path d="M 395,218 L 395,344" stroke="white" strokeWidth={0.9} strokeOpacity={0.28} variants={draw} custom={0.52} />
          <motion.path d="M 435,218 L 435,344" stroke="white" strokeWidth={0.9} strokeOpacity={0.28} variants={draw} custom={0.54} />
          <motion.path d="M 475,218 L 475,344" stroke="white" strokeWidth={0.9} strokeOpacity={0.28} variants={draw} custom={0.56} />
          <circle cx={395} cy={325} r={6} stroke="white" strokeWidth={1.5} strokeOpacity={0.85} filter="url(#inf-glow)" />
          <circle cx={395} cy={325} r={2.5} fill="white" fillOpacity={0.7} />
          <circle cx={435} cy={292} r={6} stroke="white" strokeWidth={1.5} strokeOpacity={0.85} filter="url(#inf-glow)" />
          <circle cx={435} cy={292} r={2.5} fill="white" fillOpacity={0.7} />
          <circle cx={475} cy={248} r={6} stroke="white" strokeWidth={1.5} strokeOpacity={0.85} filter="url(#inf-glow)" />
          <circle cx={475} cy={248} r={2.5} fill="white" fillOpacity={0.7} />
          {/* Starburst */}
          <g transform="translate(445, 189)">
            <g>
              {/* @ts-ignore */}
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30 * Math.PI) / 180;
                return <line key={i} x1={7 * Math.cos(a)} y1={7 * Math.sin(a)} x2={20 * Math.cos(a)} y2={20 * Math.sin(a)} stroke="white" strokeWidth={1.1} strokeOpacity={0.72} filter="url(#inf-glow)" />;
              })}
              <circle cx={0} cy={0} r={3.5} fill="white" fillOpacity={0.85} />
            </g>
          </g>
        </motion.g>
      </motion.g>

      {/* ── OUTPUT PATHS ────────────────────────────────────────────── */}
      <motion.g initial="hidden" animate="visible">
        <motion.path d="M 510,268 C 570,260 622,248 672,238" stroke="white" strokeWidth={0.9} strokeOpacity={0.38} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.6} />
        <motion.path d="M 510,290 C 570,302 622,322 672,362" stroke="white" strokeWidth={0.9} strokeOpacity={0.38} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.62} />
      </motion.g>

      {/* Output packets */}
      <circle r={2.5} fill="white" fillOpacity={0.85}>
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="2s">
          <mpath href="#inf-out-0" />
        </animateMotion>
      </circle>
      <circle r={2.5} fill="white" fillOpacity={0.85}>
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.3s">
          <mpath href="#inf-out-1" />
        </animateMotion>
      </circle>

      {/* ── OUTPUT GPU CARDS ─────────────────────────────────────────── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <motion.g initial="hidden" animate="visible">
          {/* GPU Card 1 */}
          <motion.path d="M 670,205 L 790,205 L 790,272 L 670,272 Z" stroke="white" strokeWidth={1.1} strokeOpacity={0.6} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.7} />
          <circle cx={685} cy={238} r={22} stroke="white" strokeWidth={0.9} strokeOpacity={0.45} />
          <circle cx={685} cy={238} r={14} stroke="white" strokeWidth={0.8} strokeOpacity={0.35} />
          <circle cx={685} cy={238} r={6} fill="white" fillOpacity={0.5} />
          <line x1={710} y1={218} x2={780} y2={218} stroke="white" strokeWidth={0.7} strokeOpacity={0.3} />
          <line x1={710} y1={230} x2={775} y2={230} stroke="white" strokeWidth={0.7} strokeOpacity={0.3} />
          <line x1={710} y1={242} x2={780} y2={242} stroke="white" strokeWidth={0.7} strokeOpacity={0.3} />
          {/* GPU Card 2 */}
          <motion.path d="M 670,330 L 790,330 L 790,397 L 670,397 Z" stroke="white" strokeWidth={1.1} strokeOpacity={0.6} filter="url(#inf-glow)" vectorEffect="non-scaling-stroke" variants={draw} custom={0.74} />
          <circle cx={685} cy={363} r={22} stroke="white" strokeWidth={0.9} strokeOpacity={0.45} />
          <circle cx={685} cy={363} r={14} stroke="white" strokeWidth={0.8} strokeOpacity={0.35} />
          <circle cx={685} cy={363} r={6} fill="white" fillOpacity={0.5} />
          <line x1={710} y1={343} x2={780} y2={343} stroke="white" strokeWidth={0.7} strokeOpacity={0.3} />
          <line x1={710} y1={355} x2={775} y2={355} stroke="white" strokeWidth={0.7} strokeOpacity={0.3} />
          <line x1={710} y1={367} x2={780} y2={367} stroke="white" strokeWidth={0.7} strokeOpacity={0.3} />
        </motion.g>
      </motion.g>

      {/* Curved label */}
      <motion.g {...fade(1.1)}>
        <text fill="white" fillOpacity={0.4} fontSize={10.5} fontFamily="var(--font-geist-mono)" letterSpacing={0.5}>
          <textPath href="#inf-curve-text">
            Autoscale from zero — Pay per token — Consistent latency SLOs
          </textPath>
        </text>
      </motion.g>
    </svg>
  );
}
