"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

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

function fade(delay: number, duration = 0.55) {
  return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration } };
}

// Arkadaki çizgilerin çamur gibi birbirine girmesini engelleyen "Wireframe Dolgusu"
const BG = "#0a0b10";

// --- GPU KARTI (Sola ve Aşağıya Kaydırıldı) ---
function GpuCard({ x, y, index, total }: { x: number; y: number; index: number; total: number }) {
  const W = 45;
  const H = 140;
  const Dx = 30;  
  const Dy = -20; 
  
  const isFront = index === 0;
  const op = 0.3 + ((total - index) / total) * 0.7; 

  const fanCx = x + W / 2;
  const fanCy1 = y + 40;
  const fanCy2 = y + 100;
  const fanDur = `${1.2 + index * 0.2}s`;

  return (
    <g>
      <path d={`M ${x},${y} L ${x + W},${y} L ${x + W + Dx},${y + Dy} L ${x + Dx},${y + Dy} Z`} stroke="white" strokeWidth={0.8} strokeOpacity={op * 0.6} fill={BG} />
      {isFront && (
        <path d={`M ${x + W},${y} L ${x + W + Dx},${y + Dy} L ${x + W + Dx},${y + Dy + H} L ${x + W},${y + H} Z`} stroke="white" strokeWidth={0.8} strokeOpacity={op * 0.4} fill={BG} />
      )}
      <path d={`M ${x},${y} L ${x + W},${y} L ${x + W},${y + H} L ${x},${y + H} Z`} stroke="white" strokeWidth={isFront ? 1.5 : 1} strokeOpacity={op} fill={BG} />
      
      <circle cx={x + 10} cy={y + 12} r={2} fill="white" fillOpacity={op} filter="url(#orch-glow)"/>
      {index < 4 && <circle cx={x + 18} cy={y + 12} r={1.5} fill="white" fillOpacity={op * 0.5} />}
      
      {/* Üst Fan */}
      <g>
        <circle cx={fanCx} cy={fanCy1} r={16} stroke="white" strokeWidth={1} strokeOpacity={op * 0.7} fill="none" />
        <circle cx={fanCx} cy={fanCy1} r={10} stroke="white" strokeWidth={0.8} strokeOpacity={op * 0.5} fill="none" />
        <circle cx={fanCx} cy={fanCy1} r={3} fill="white" fillOpacity={op * 0.8} />
        <g transform={`translate(${fanCx},${fanCy1})`}>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={fanDur} repeatCount="indefinite" />
            {[0, 90, 180, 270].map((deg, i) => {
              const a = (deg * Math.PI) / 180;
              return <line key={i} x1={3 * Math.cos(a)} y1={3 * Math.sin(a)} x2={14 * Math.cos(a)} y2={14 * Math.sin(a)} stroke="white" strokeWidth={1} strokeOpacity={op * 0.6}/>;
            })}
          </g>
        </g>
      </g>
      
      {/* Alt Fan */}
      <g>
        <circle cx={fanCx} cy={fanCy2} r={16} stroke="white" strokeWidth={1} strokeOpacity={op * 0.7} fill="none" />
        <circle cx={fanCx} cy={fanCy2} r={10} stroke="white" strokeWidth={0.8} strokeOpacity={op * 0.5} fill="none" />
        <circle cx={fanCx} cy={fanCy2} r={3} fill="white" fillOpacity={op * 0.8} />
        <g transform={`translate(${fanCx},${fanCy2})`}>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={fanDur} repeatCount="indefinite" />
            {[0, 90, 180, 270].map((deg, i) => {
              const a = (deg * Math.PI) / 180;
              return <line key={i} x1={3 * Math.cos(a)} y1={3 * Math.sin(a)} x2={14 * Math.cos(a)} y2={14 * Math.sin(a)} stroke="white" strokeWidth={1} strokeOpacity={op * 0.6}/>;
            })}
          </g>
        </g>
      </g>
    </g>
  );
}

export function OrchestratorScene() {
  const starLines = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return { x1: 5 * Math.cos(a), y1: 5 * Math.sin(a), x2: 12 * Math.cos(a), y2: 12 * Math.sin(a) };
  }), []);

  return (
    <div className="w-full h-full min-h-[700px] flex justify-center items-center bg-[#0a0b10] overflow-hidden">
      <svg viewBox="0 0 1000 800" fill="none" aria-hidden className="w-full h-full max-w-[1100px]">
        <defs>
          <filter id="orch-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* MİLİMETRİK HİZALANMIŞ KABLO YOLLARI */}
          <path id="orch-line-a" d="M 670,250 L 620,280" /> {/* Laptop -> CU Üst Sağ */}
          <path id="orch-line-b" d="M 380,480 L 430,420" /> {/* GPU Arka Sağ -> CU Sol Alt */}
          <path id="orch-line-c" d="M 660,540 L 570,470" /> {/* Cloud Üst Sol -> CU Sağ Alt */}
        </defs>

        {/* ── 1. BAĞLANTI ÇİZGİLERİ ── */}
        <motion.g initial="hidden" animate="visible">
          <motion.path d="M 670,250 L 620,280" stroke="white" strokeWidth={1.5} strokeOpacity={0.5} filter="url(#orch-glow)" variants={draw} custom={0.2} />
          <motion.path d="M 380,480 L 430,420" stroke="white" strokeWidth={1.5} strokeOpacity={0.5} filter="url(#orch-glow)" variants={draw} custom={0.4} />
          <motion.path d="M 660,540 L 570,470" stroke="white" strokeWidth={1.5} strokeOpacity={0.5} filter="url(#orch-glow)" variants={draw} custom={0.6} />
        </motion.g>

        {/* ── Bağlantı Eklem Noktaları (Glow Dots) ── */}
        <motion.g {...fade(1.0)}>
          {/* Merkez Kutudaki Noktalar */}
          <circle cx={620} cy={280} r={4} fill="white" filter="url(#orch-glow)" />
          <circle cx={430} cy={420} r={4} fill="white" filter="url(#orch-glow)" />
          <circle cx={570} cy={470} r={4} fill="white" filter="url(#orch-glow)" />
          
          {/* Objelerdeki Çıkış Noktaları */}
          <circle cx={670} cy={250} r={3} fill="white" filter="url(#orch-glow)" />
          <circle cx={380} cy={480} r={3} fill="white" filter="url(#orch-glow)" />
          <circle cx={660} cy={540} r={3} fill="white" filter="url(#orch-glow)" />
        </motion.g>

        {/* ── 2. DATA PACKETS (Akan Veri) ── */}
        <circle r={3} fill="white" filter="url(#orch-glow)">
          <animateMotion dur="1.5s" repeatCount="indefinite"><mpath href="#orch-line-a" /></animateMotion>
        </circle>
        <circle r={3} fill="white" filter="url(#orch-glow)">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s"><mpath href="#orch-line-b" /></animateMotion>
        </circle>
        <circle r={3} fill="white" filter="url(#orch-glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s"><mpath href="#orch-line-c" /></animateMotion>
        </circle>

        {/* ── 3. LAPTOP (Sağ Üste Sabitlendi: 740, 180) ── */}
        <motion.g initial="hidden" animate="visible" variants={fade} custom={0.4} transform="translate(740, 180)">
          {/* Ekran */}
          <path d="M -60,-60 L 80,-60 L 100,20 L -40,20 Z" fill={BG} stroke="white" strokeWidth={1.5} strokeOpacity={0.8} />
          <path d="M -50,-50 L 70,-50 L 85,10 L -35,10 Z" fill="none" stroke="white" strokeWidth={1} strokeOpacity={0.4} />
          {/* Klavye Tabanı */}
          <path d="M -40,20 L 100,20 L 130,70 L -70,70 Z" fill={BG} stroke="white" strokeWidth={1.5} strokeOpacity={0.8} />
          {/* Kod Satırları */}
          <line x1="-30" y1="-30" x2="20" y2="-30" stroke="white" strokeWidth={2} strokeOpacity={0.5}/>
          <line x1="-25" y1="-15" x2="40" y2="-15" stroke="white" strokeWidth={2} strokeOpacity={0.5}/>
          {/* Touchpad */}
          <path d="M 10,40 L 50,40 L 60,60 L 15,60 Z" fill="none" stroke="white" strokeWidth={0.8} strokeOpacity={0.3} />
        </motion.g>

        {/* ── 4. MERKEZ KUTU (Tam Ortada: 500, 400) ── */}
        <motion.g initial="hidden" animate="visible" variants={fade} custom={0.6} transform="translate(500, 400)">
          {/* Üst Yüzey */}
          <path d="M -70,-70 L 70,-70 L 120,-120 L -20,-120 Z" fill={BG} stroke="white" strokeWidth={1.2} strokeOpacity={0.6} />
          {/* Sağ Yüzey */}
          <path d="M 70,-70 L 120,-120 L 120,20 L 70,70 Z" fill={BG} stroke="white" strokeWidth={1.2} strokeOpacity={0.5} />
          {/* Ön Yüzey */}
          <path d="M -70,-70 L 70,-70 L 70,70 L -70,70 Z" fill={BG} stroke="white" strokeWidth={1.5} strokeOpacity={0.9} />

          {/* Sliderlar */}
          <line x1="-40" y1="-40" x2="-40" y2="40" stroke="white" strokeWidth={1} strokeOpacity={0.3} />
          <circle cx="-40" cy="10" r="5" stroke="white" strokeWidth={1.5} fill={BG} filter="url(#orch-glow)" />
          <circle cx="-40" cy="10" r="2" fill="white" />

          <line x1="0" y1="-40" x2="0" y2="40" stroke="white" strokeWidth={1} strokeOpacity={0.3} />
          <circle cx="0" cy="-20" r="5" stroke="white" strokeWidth={1.5} fill={BG} filter="url(#orch-glow)" />
          <circle cx="0" cy="-20" r="2" fill="white" />

          <line x1="40" y1="-40" x2="40" y2="40" stroke="white" strokeWidth={1} strokeOpacity={0.3} />
          <circle cx="40" cy="20" r="5" stroke="white" strokeWidth={1.5} fill={BG} filter="url(#orch-glow)" />
          <circle cx="40" cy="20" r="2" fill="white" />

          {/* Deployment Task Etiketi (Kutuya bağlı, asla uçmaz) */}
          <g transform="translate(-40, -150)">
            <rect width="105" height="22" rx="3" stroke="white" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="4 2" fill={BG} />
            <text x="10" y="15" fill="white" fillOpacity={0.7} fontSize="11" fontFamily="monospace">Deployment Task</text>
            <line x1="52" y1="22" x2="52" y2="50" stroke="white" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="2 2" />
          </g>

          {/* Starburst Efekti */}
          <g transform="translate(12, -110)">
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="20s" repeatCount="indefinite" />
              {starLines.map((l, i) => <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="white" strokeWidth={1} strokeOpacity={0.6} />)}
            </g>
            <circle cx="0" cy="0" r="3" fill="white" filter="url(#orch-glow)" />
          </g>
        </motion.g>

        {/* ── 5. GPU CLUSTER (Çizdiğin Kutunun İçi - Tam Sola ve Alta Çekildi) ── */}
        <motion.g initial="hidden" animate="visible" variants={fade} custom={0.8}>
          {[6, 5, 4, 3, 2, 1, 0].map((idx) => {
            // Tam sol alta doğru sıralanan matematik (X=95'ten başlıyor)
            const x = 95 + idx * 35; 
            const y = 632 - idx * 22; 
            return <GpuCard key={idx} x={x} y={y} index={idx} total={7} />;
          })}
        </motion.g>

        {/* ── 6. BULUT & N ROZETİ (Sağ Alta Sabitlendi: 750, 580) ── */}
        <motion.g initial="hidden" animate="visible" variants={fade} custom={1.2} transform="translate(750, 580)">
          <path d="M -90,-40 C -110,-40 -120,-20 -110,0 C -130,-5 -130,20 -110,25 C -120,40 -90,40 -80,25 C -70,35 -30,35 -20,20 C 0,20 10,-5 -10,-20 C 0,-40 -30,-60 -50,-50 C -70,-70 -100,-70 -90,-40 Z" fill={BG} stroke="white" strokeWidth={1.5} strokeOpacity={0.6} />
          <circle cx="-10" cy="30" r="22" fill={BG} stroke="white" strokeWidth={1.2} strokeOpacity={0.8} filter="url(#orch-glow)"/>
          <text x="-10" y="36" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">N</text>
        </motion.g>

        {/* ── 7. TEXT LABEL (GPU'lara çarpmadan merkeze hizalandı) ── */}
        <motion.g {...fade(1.4)}>
          <text x="500" y="520" textAnchor="middle" fill="white" fillOpacity={0.5} fontSize="12" fontFamily="monospace" letterSpacing={1}>
            Workload-Aware Orchestration
          </text>
          <path d="M 400,535 L 600,535" stroke="white" strokeWidth={1} strokeOpacity={0.2} strokeDasharray="2 2" />
        </motion.g>

      </svg>
    </div>
  );
}