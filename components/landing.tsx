/* eslint-disable react-hooks/purity */
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileCode, FileText, FileSpreadsheet, FileArchive,
  CheckCircle2, Zap, Globe, Database, Cloud, Activity,
  FileImage
} from "lucide-react";

// ============================================================================
// CONFIGURATION & THEME (Premium SaaS Colors - Only Colors Touched)
// ============================================================================
const ANIM_DURATION = 14;
const ITEMS_COUNT = 6;
const ROSE = "#f43f5e"; // Input / Rose Contrast
const LIME = "#9eff00"; // Output / Neon Lime
const BG_DARK = "#020203";
// Ultra Deep Black
const INPUT_FILES = [
  { Icon: FileCode, label: "app.tsx", color: "text-sky-400" },
  { Icon: FileText, label: "config.rs", color: "text-rose-400" },
  { Icon: FileSpreadsheet, label: "data.csv", color: "text-emerald-400" },
  { Icon: FileArchive, label: "build.zip", color: "text-amber-400" },
  { Icon: FileImage, label: "asset.png", color: "text-purple-400" },
];

const BLOCKS_PER_BELT = 3;
const FILES = [
  { Icon: FileCode, label: ".go", color: "text-sky-400" },
  { Icon: FileText, label: ".rs", color: "text-rose-400" },
  { Icon: FileCode, label: ".tsx", color: "text-cyan-400" },
  { Icon: FileSpreadsheet, label: ".yml", color: "text-violet-400" },
  { Icon: FileArchive, label: ".zip", color: "text-amber-400" },
];

const COLORS = {
  bg: "#020203", // Ultra deep space black
  input: "#f43f5e", // Rose-500
  inputGlow: "rgba(244, 63, 94, 0.6)",
  output: "#9eff00", // Neon Lime
  outputGlow: "rgba(158, 255, 0, 0.6)",
  metalDark: "#0b0c10",
  metalLight: "#1a1d27",
  grid: "rgba(255, 255, 255, 0.04)",
};

// ============================================================================
// 1. CARTRIDGE (Physical Data Blocks)
// ============================================================================
function Cartridge({ index, delayOffset = 0 }: { index: number; delayOffset?: number }) {
  const file = FILES[index % FILES.length];
  const delay = `${-((ANIM_DURATION / ITEMS_COUNT) * index + delayOffset)}s`;

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 w-[64px] h-[64px] z-20"
      style={{
        animation: `vcore-item-flow ${ANIM_DURATION}s linear infinite`,
        animationDelay: delay,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 bg-black/90 blur-md transform translateZ(-2px) scale-110" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1c1f2e] to-[#0a0c12] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden"
        style={{ transform: "translateZ(8px)", boxShadow: "0 10px 25px rgba(0,0,0,0.8)" }}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1" style={{ animation: `vcore-raw-fade ${ANIM_DURATION}s linear infinite`, animationDelay: delay }}>
          <file.Icon className={`w-5 h-5 ${file.color}`} strokeWidth={1.5} />
          <span className={`font-mono text-[8px] font-bold ${file.color}`}>{file.label}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center" style={{ animation: `vcore-out-fade ${ANIM_DURATION}s linear infinite`, animationDelay: delay }}>
          <CheckCircle2 className="w-7 h-7 text-[#9eff00] drop-shadow-[0_0_10px_#9eff00]" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. CUBE FACE (Premium Metallic Surfaces)
// ============================================================================
function CubeFace({ transform, type }: { transform: string; type: "input" | "output" | "top" | "bottom" }) {
  const isSide = type === "input" || type === "output";
  const glowColor = type === "input" ? ROSE : LIME;

  return (
    <div
      className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        transform,
        transformStyle: "preserve-3d",
        maskImage: isSide ? "radial-gradient(circle at center, transparent 48px, black 49px)" : "none",
        WebkitMaskImage: isSide ? "radial-gradient(circle at center, transparent 48px, black 49px)" : "none",
      }}
    >
      <div className={`absolute inset-0 border-2 border-[#9eff00]  ${type === 'bottom' ? 'bg-[#020203]' : 'bg-gradient-to-br from-white/10 '}`} style={{ boxShadow: "inset 0 0 60px #000000" }} />
      {isSide && (
        <div className="absolute w-[98px] h-[98px] rounded-full border-4 shadow-[0_0_20px_currentColor]" style={{ color: glowColor, opacity: 0.25 }} />
      )}
    </div>
  );
}

// ============================================================================
// 3. CONVEYOR BELT (Through The Core)
// ============================================================================
const ConveyorBelt = ({ x, y, w, h, rotate, isInput }: { x: number; y: number; w: number; h: number; rotate: number; isInput: boolean }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 group "
    style={{ left: x, top: y, width: w, height: h, transform: `rotate(${rotate}deg)`, transformStyle: "preserve-3d" }}
  >
    {/* Floor Ambient occlusion shadow */}
    <div className="absolute inset-[-10px] bg-black/80 blur-xl transform translateZ(-5px)" />

    {/* Left Rail */}
    <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-[#1a1c23] to-[#0a0c10] border-r border-[#9eff00] rounded-l-sm shadow-[inset_1px_0_2px_rgba(255,255,255,0.1)]" style={{ transform: "translateZ(4px)" }} />
    {/* Right Rail */}
    <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-[#9eff00] to-[#0a0c10] border-l border-[#9eff00] rounded-r-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.1)]" style={{ transform: "translateZ(4px)" }} />

    {/* Glowing Status Strip on Rails */}
    <div className="absolute top-0 bottom-0 left-[2px] w-[1px] opacity-50" style={{ background: `linear-gradient(to bottom, transparent, ${isInput ? COLORS.input : COLORS.output}, transparent)` }} />
    <div className="absolute top-0 bottom-0 right-[2px] w-[1px] opacity-50" style={{ background: `linear-gradient(to bottom, transparent, ${isInput ? COLORS.input : COLORS.output}, transparent)` }} />

    {/* Roller End Caps */}
    <div className="absolute left-1 right-1 h-6 top-[-12px] bg-gradient-to-b from-[#2a2d36] to-[#0a0c10] rounded-full border border-[#9eff00] flex items-center justify-between px-2" style={{ transform: "translateZ(2px)" }}>
      <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
    </div>
    <div className="absolute left-1 right-1 h-6 bottom-[-12px] bg-gradient-to-t from-[#2a2d36] to-[#0a0c10] rounded-full border border-[#9eff00] flex items-center justify-between px-2" style={{ transform: "translateZ(2px)" }}>
      <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
    </div>

    {/* The Belt Track */}
    <div className="absolute inset-y-0 left-2 right-2 bg-[#020203] overflow-hidden">
      <div className="absolute inset-0 shadow-[inset_5px_0_10px_rgba(0,0,0,0.8),inset_-5px_0_10px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />

      {/* Moving Ridges */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #050608 0px, #050608 20px, #0a0c10 20px, #0a0c10 24px, rgba(255,255,255,0.02) 24px, rgba(255,255,255,0.02) 25px)",
          backgroundSize: "25px 100%",
          animation: `mrs-belt-scroll 1s linear infinite ${isInput ? "reverse" : "normal"}`,
        }}
      />

      {/* Energy Grid Lines moving with belt */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${isInput ? COLORS.input : COLORS.output} 50%, transparent 100%)`,
          backgroundSize: "200% 100%",
          animation: `mrs-energy-flow 3s ease-in-out infinite ${isInput ? "reverse" : "normal"}`,
        }}
      />
    </div>

    {/* Moving Files */}
    {Array.from({ length: BLOCKS_PER_BELT }).map((_, i) => (
      <FileBlock key={i} delay={(ANIM_DURATION / BLOCKS_PER_BELT) * i} isInput={isInput} />
    ))}
  </div>
);
const FileBlock = ({ delay, isInput }: { delay: number; isInput: boolean }) => {
  const file = INPUT_FILES[Math.floor(Math.random() * INPUT_FILES.length)];

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        x: isInput ? [-300, 150] : [-150, 300],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5]
      }}
      transition={{ duration: ANIM_DURATION, repeat: Infinity, ease: "linear", delay: -delay, times: [0, 0.1, 0.9, 1] }}
    >
      <div className="relative w-20 h-24" style={{ transformStyle: "preserve-3d" }}>
        {/* Contact Shadow */}
        <div className="absolute inset-0 bg-black/90 blur-md transform translateZ(2px) scale-110" />

        {/* High-Tech Cartridge Body */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1e2233] via-[#0f111a] to-[#050608] rounded-xl flex flex-col items-center justify-between p-2 overflow-hidden border border-white/10"
          style={{
            transform: "translateZ(15px)",
            boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.1), inset -1px -1px 4px rgba(0,0,0,0.8), 0 15px 25px rgba(0,0,0,0.6)"
          }}
        >
          {/* Top glowing notch */}
          <div className="w-10 h-1 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute inset-0 opacity-50" style={{ background: isInput ? COLORS.input : COLORS.output, filter: 'blur(2px)' }} />
          </div>

          {/* Glass Top Reflection */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {isInput ? (
            <div className="flex flex-col items-center justify-center gap-2 z-10 w-full h-full">
              <div className="w-10 h-10 rounded-full bg-black/50 border border-white/5 flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <file.Icon className={`w-5 h-5 ${file.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`} strokeWidth={1.5} />
              </div>
              <div className="bg-black/60 px-2 py-0.5 rounded border border-white/5 w-full text-center">
                <span className={`font-mono text-[9px] font-bold ${file.color} truncate block w-full`}>{file.label}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 z-10 w-full h-full">
              <div className="absolute inset-0 bg-[#9eff00]/20 blur-xl mix-blend-screen" />
              <div className="w-10 h-10 rounded-full bg-[#9eff00]/10 border border-[#9eff00]/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#9eff00] drop-shadow-[0_0_12px_#9eff00]" strokeWidth={2.5} />
              </div>
              <div className="bg-[#9eff00]/10 px-2 py-0.5 rounded border border-[#9eff00]/20 w-full text-center">
                <span className="font-mono text-[9px] font-bold text-[#9eff00] truncate block w-full">COMPILED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
// ============================================================================
// 4. MAIN SCENE
// ============================================================================
export default function MiransasFinalXCore() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black  selection:bg-[#9eff00] selection:text-black">

      <style jsx global>{`
        @keyframes vcore-belt-scroll { 0% { background-position: 0 0; } 100% { background-position: 44px 0; } }
        @keyframes vcore-item-flow { 0% { left: 100%; } 100% { left: 0%; } }
        @keyframes vcore-raw-fade { 0%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }
        @keyframes vcore-out-fade { 0%, 45% { opacity: 0; } 55%, 100% { opacity: 1; } }
        @keyframes ssm-rotate { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(-360deg); } }
      `}</style>

      <div className="relative w-full h-[850px] flex items-center justify-center pointer-events-none" style={{ perspective: "2500px" }}>
        <div className="relative w-[1200px] h-[1200px]" style={{ transform: "rotateX(60deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}>

          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px", transform: "translateZ(-5px)" }} />

          <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-10" style={{ transformStyle: "preserve-3d" }}>
            <CubeFace transform="translateZ(-120px) rotateY(180deg)" type="bottom" />
            <CubeFace transform="translateY(-120px) rotateX(90deg)" type="output" />
            <CubeFace transform="translateX(-120px) rotateY(-90deg)" type="input" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-rose-500/10 blur-3xl animate-pulse" />
          </div>

          <div className="mt-20">
            <ConveyorBelt x={425} y={600} w={650} h={100} rotate={0} isInput={true}/>
            <ConveyorBelt x={600} y={775} w={650} h={100} rotate={90} isInput={true} />
             <ConveyorBelt x={600} y={425} w={650} h={100} rotate={90} isInput={false} />
            <ConveyorBelt x={775} y={600} w={650} h={100} rotate={0} isInput={false} />
          </div>

          <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-40" style={{ transformStyle: "preserve-3d" }}>
            <CubeFace transform="translateY(120px) rotateX(-90deg)" type="input" />
            <CubeFace transform="translateX(120px) rotateY(90deg)" type="output" />

            <div className="absolute inset-0" style={{ transform: "translateZ(240px)", transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#12141f] to-[#020203] border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_#000]" style={{ maskImage: "radial-gradient(circle, transparent 85px, black 86px)", WebkitMaskImage: "radial-gradient(circle, transparent 85px, black 86px)" }} />

              <div className="absolute top-1/2 left-1/2 w-[170px] h-[170px] -translate-x-1/2 -translate-y-1/2" style={{ transform: "translateZ(-15px)", transformStyle: "preserve-3d" }}>
                <div className="relative w-full h-full" style={{ animation: "ssm-rotate 12s linear infinite", transformStyle: "preserve-3d" }}>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] font-black text-[#f43f5e] whitespace-nowrap tracking-widest" style={{ transform: `rotateZ(${i * 90}deg) translateY(-58px) rotateX(-90deg)`, filter: "drop-shadow(0 0 5px #f43f5e)" }}>
                      SSM • MIRANSAS • PIPELINE •
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#05060a] border-4 border-[#0a0c12] flex items-center justify-center shadow-[inset_0_5px_15px_#000]" style={{ transform: "translateZ(-20px)" }}>
                <div className="w-20 h-20 rounded-full bg-[#11141f] border border-white/5 flex items-center justify-center shadow-[0_10px_20px_#000]">
                  <span className="font-sans text-5xl font-black italic text-[#9eff00] drop-shadow-[0_0_15px_#9eff00]">M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}