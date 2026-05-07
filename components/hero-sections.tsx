/* eslint-disable react-hooks/purity */
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileCode, FileText, FileSpreadsheet, FileArchive,
  FileImage, CheckCircle2, Terminal, Layers
} from "lucide-react";

// ============================================================================
// CONFIGURATION & THEME
// ============================================================================

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

const INPUT_FILES = [
  { Icon: FileCode, label: "app.tsx", color: "text-sky-400" },
  { Icon: FileText, label: "config.rs", color: "text-rose-400" },
  { Icon: FileSpreadsheet, label: "data.csv", color: "text-emerald-400" },
  { Icon: FileArchive, label: "build.zip", color: "text-amber-400" },
  { Icon: FileImage, label: "asset.png", color: "text-purple-400" },
];

const ANIM_DURATION = 8; 
const BLOCKS_PER_BELT = 3; 

// ── 1. PREMIUM EDGE NODE ──
const EdgeNode = ({ x, y, color, label }: { x: number; y: number; color: string; label: string }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center group"
    style={{ left: x, top: y, transformStyle: "preserve-3d", zIndex: 10 }}
  >
    {/* Ground ambient light */}
    <div className="absolute w-[250px] h-[250px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-60" style={{ background: `radial-gradient(circle, ${color}30 0%, transparent 60%)`, transform: "translateZ(-2px)" }} />
    
    {/* Data rings */}
    <motion.div className="absolute inset-[-60px] rounded-full border-[2px] border-dashed" style={{ borderColor: `${color}40` }} animate={{ rotateZ: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
    <motion.div className="absolute inset-[-80px] rounded-full border border-solid" style={{ borderColor: `${color}20` }} animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

    {/* 3D Cylindrical Base */}
    <div className="relative w-32 h-32" style={{ transformStyle: "preserve-3d" }}>
      {/* Base shadows */}
      <div className="absolute inset-0 rounded-full bg-black/90 blur-md translate-z-[-1px] scale-110" />
      
      {/* Layered disks to form a cylinder */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-white/5 bg-[#0a0c10]"
          style={{ 
            transform: `translateZ(${i * 4}px)`,
            boxShadow: i === 4 ? `inset 0 0 20px ${color}20` : 'none',
            background: i === 4 ? '#050608' : '#0a0c10'
          }}
        />
      ))}

      {/* Top Surface */}
      <div className="absolute inset-0 rounded-full border-2 flex items-center justify-center bg-[#050608]" style={{ transform: "translateZ(20px)", borderColor: `${color}40`, boxShadow: `inset 0 0 30px ${color}30` }}>
        {/* Core Ring */}
        <div className="w-16 h-16 rounded-full border-[4px] border-[#0a0c10] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden">
           <div className="absolute inset-0 animate-spin-slow" style={{ background: `conic-gradient(from 0deg, transparent, ${color} 50%, transparent)` }} />
           <div className="absolute inset-1 rounded-full bg-[#050608] flex items-center justify-center z-10">
             <div className="w-6 h-6 rounded-full animate-pulse" style={{ background: color, filter: "blur(4px)", opacity: 0.8 }} />
             <div className="w-3 h-3 rounded-full bg-white absolute" style={{ boxShadow: `0 0 10px ${color}` }} />
           </div>
        </div>
      </div>
    </div>

    {/* Holographic Label */}
    <div
      className="absolute flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-md"
      style={{
        background: `linear-gradient(135deg, rgba(10,12,16,0.9), rgba(5,6,8,0.9))`,
        borderColor: `${color}40`,
        color,
        transform: "rotateZ(-45deg) rotateX(-60deg) translateZ(80px) translateY(-20px)",
        boxShadow: `0 10px 30px rgba(0,0,0,0.8), 0 0 20px ${color}10`,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap">{label}</span>
      {/* HUD line connecting label to node */}
      <div className="absolute w-[2px] h-[60px] left-1/2 -bottom-[60px] origin-top opacity-50" style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }} />
    </div>
  </div>
);

// ── 2. ARMORED GLOWING CABLE ──
const ArmoredCable = ({ d, color, reverse = false }: { d: string; color: string; reverse?: boolean }) => (
  <g style={{ transform: "translateZ(1px)" }}>
    {/* Ambient Floor Glow from Cable */}
    <path d={d} stroke={color} strokeWidth="40" fill="none" strokeLinecap="round" style={{ filter: "blur(25px)", opacity: 0.15, mixBlendMode: "screen" }} />
    {/* Ground Drop Shadow */}
    <path d={d} stroke="rgba(0,0,0,0.8)" strokeWidth="20" fill="none" strokeLinecap="round" style={{ filter: "blur(4px)", transform: "translateY(5px)" }} />
    {/* Heavy Physical Armor */}
    <path d={d} stroke="#050608" strokeWidth="18" fill="none" strokeLinecap="round" />
    <path d={d} stroke="#13161f" strokeWidth="14" fill="none" strokeLinecap="round" />
    <path d={d} stroke="#1f2333" strokeWidth="6" fill="none" strokeLinecap="round" />
    {/* Traveling Energy Core */}
    <motion.path
      d={d} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="80 250"
      animate={{ strokeDashoffset: reverse ? [0, -1000] : [1000, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      style={{ filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color})` }}
    />
  </g>
);

// ── 3. PREMIUM CARTRIDGE (FILE BLOCK) ──
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
};

// ── 4. PREMIUM CONVEYOR BELT ──
const Belt = ({ x, y, w, h, rotate, isInput }: { x: number; y: number; w: number; h: number; rotate: number; isInput: boolean }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 group"
    style={{ left: x, top: y, width: w, height: h, transform: `rotate(${rotate}deg)`, transformStyle: "preserve-3d" }}
  >
    {/* Floor Ambient occlusion shadow */}
    <div className="absolute inset-[-10px] bg-black/80 blur-xl transform translateZ(-5px)" />

    {/* Left Rail */}
    <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-[#1a1c23] to-[#0a0c10] border-r border-white/10 rounded-l-sm shadow-[inset_1px_0_2px_rgba(255,255,255,0.1)]" style={{ transform: "translateZ(4px)" }} />
    {/* Right Rail */}
    <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-[#1a1c23] to-[#0a0c10] border-l border-white/10 rounded-r-sm shadow-[inset_-1px_0_2px_rgba(255,255,255,0.1)]" style={{ transform: "translateZ(4px)" }} />

    {/* Glowing Status Strip on Rails */}
    <div className="absolute top-0 bottom-0 left-[2px] w-[1px] opacity-50" style={{ background: `linear-gradient(to bottom, transparent, ${isInput ? COLORS.input : COLORS.output}, transparent)` }} />
    <div className="absolute top-0 bottom-0 right-[2px] w-[1px] opacity-50" style={{ background: `linear-gradient(to bottom, transparent, ${isInput ? COLORS.input : COLORS.output}, transparent)` }} />

    {/* Roller End Caps */}
    <div className="absolute left-1 right-1 h-6 top-[-12px] bg-gradient-to-b from-[#2a2d36] to-[#0a0c10] rounded-full border border-white/10 flex items-center justify-between px-2" style={{ transform: "translateZ(2px)" }}>
      <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
    </div>
    <div className="absolute left-1 right-1 h-6 bottom-[-12px] bg-gradient-to-t from-[#2a2d36] to-[#0a0c10] rounded-full border border-white/10 flex items-center justify-between px-2" style={{ transform: "translateZ(2px)" }}>
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

export default function VCoreHero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden selection:bg-[#9eff00] selection:text-black" style={{ backgroundColor: COLORS.bg }}>
      
      <style jsx global>{`
        @keyframes mrs-belt-scroll { 0% { background-position: 0 0; } 100% { background-position: 25px 0; } }
        @keyframes mrs-energy-flow { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes core-pulse { 
          0%, 100% { filter: drop-shadow(0 0 50px rgba(244,63,94,0.6)); transform: translateZ(80px) scale(1); } 
          50% { filter: drop-shadow(0 0 100px rgba(244,63,94,1)); transform: translateZ(80px) scale(1.02); } 
        }
        @keyframes float-m {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 15px rgba(244,63,94,0.6)); }
          50% { transform: translateY(-8px); filter: drop-shadow(0 0 25px rgba(244,63,94,1)); }
        }
        @keyframes animate-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: animate-spin-slow 4s linear infinite;
        }
      `}</style>

      {/* --- UI LAYER --- */}
      <header className="absolute top-0 left-0 w-full px-8 py-6 z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1e2233] to-[#0a0a0f] border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-black tracking-widest text-xl tracking-[0.2em]">MIRANSAS</span>
        </div>
      </header>

      {/* --- 3D CINEMATIC ISOMETRIC SCENE --- */}
      <motion.div
        className="relative w-full h-[800px] flex items-center justify-center pointer-events-none"
        style={{ perspective: "2500px" }}
        animate={{ rotateZ: [0, 1.5, 0, -1.5, 0], rotateX: [0, 1.5, 0, 1.5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-[1200px] h-[1200px]" style={{ transform: "rotateX(60deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}>
          
          {/* Plane Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, ${COLORS.grid} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.grid} 1px, transparent 1px)`, backgroundSize: "60px 60px", transform: "translateZ(-2px)" }} />

          {/* Volumetric Floor Light Leaks */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f43f5e] blur-[150px] opacity-10 rounded-full mix-blend-screen transform translateZ(-1px)" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#f43f5e] blur-[80px] opacity-30 rounded-full mix-blend-screen transform translateZ(0px)" />

          {/* SVG CABLES (Attached flat to plane, Z=1) */}
          <svg viewBox="0 0 1200 1200" className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: "translateZ(1px)" }}>
            <ArmoredCable d="M 150 300 C 150 600, 150 600, 300 600" color={COLORS.input} reverse />
            <ArmoredCable d="M 300 1050 C 600 1050, 600 1050, 600 900" color={COLORS.input} reverse />
            <ArmoredCable d="M 600 300 C 600 150, 600 150, 900 150" color={COLORS.output} />
            <ArmoredCable d="M 1050 600 C 1050 600, 1050 900, 900 900" color={COLORS.output} />
          </svg>

          {/* EDGE NODES */}
          <EdgeNode x={150} y={300} color={COLORS.input} label="Local: Node 1" />
          <EdgeNode x={300} y={1050} color={COLORS.input} label="Local: Node 2" />
          <EdgeNode x={900} y={150} color={COLORS.output} label="Edge: Region A" />
          <EdgeNode x={1050} y={600} color={COLORS.output} label="Edge: Region B" />

          {/* HEAVY CONVEYOR BELTS (Z=20) */}
          <Belt x={425} y={600} w={350} h={100} rotate={0} isInput={true} />
          <Belt x={600} y={775} w={350} h={100} rotate={90} isInput={true} />
          <Belt x={600} y={425} w={350} h={100} rotate={90} isInput={false} />
          <Belt x={775} y={600} w={350} h={100} rotate={0} isInput={false} />

          {/* === THE CORE REACTOR === */}
          <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-40" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Core Shadow on Floor */}
            <div className="absolute inset-[-40px] bg-black/90 blur-2xl transform translateZ(0px)" />

            {/* Inner Red Plasma Ball */}
            <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-[#f43f5e] rounded-full mix-blend-screen" style={{ animation: "core-pulse 3s ease-in-out infinite" }} />
            
            {/* 3D ROOF */}
            <div
              className="absolute inset-0"
              style={{
                transform: "translateZ(140px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1a1c23] to-[#0a0c10] border border-white/20 rounded-[2rem] overflow-hidden"
                style={{
                  boxShadow: "inset 2px 2px 4px rgba(62, 189, 16, 0.1), inset -2px -2px 10px rgba(13, 143, 54, 0.9), 0 20px 50px rgba(72, 191, 21, 0.8)",
                  maskImage: "radial-gradient(circle at center, transparent 95px, black 96px)",
                  WebkitMaskImage: "radial-gradient(circle at center, transparent 95px, black 96px)",
                }}
              />

              {[...Array(10)].map((_, i) => (
                <div
                  key={`hole-wall-${i}`}
                  className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-[#030406]"
                  style={{ transform: `translateZ(${-i * 2}px)` }}
                />
              ))}

              <div
                className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#020203] shadow-[inset_0_20px_50px_rgba(0,0,0,1)] flex items-center justify-center"
                style={{ transform: "translateZ(-20px)", transformStyle: "preserve-3d" }}
              >
                
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`pedestal-${i}`}
                    className="absolute w-32 h-32 rounded-full bg-[#0a0c10] border border-[#11131c]"
                    style={{ transform: `translateZ(${i * 2}px)` }}
                  />
                ))}

                <div
                  className="absolute w-32 h-32 rounded-full border border-white/10 bg-[#11131c] flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_0_2px_5px_rgba(255,255,255,0.05)]"
                  style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}
                >
                  <div style={{ transform: "translateZ(15px)", animation: "float-m 4s ease-in-out infinite" }}>
                    <span className="font-sans text-5xl font-black italic text-[#f43f5e] drop-shadow-[0_0_20px_rgba(244,63,94,0.8)] tracking-tighter">
                       <img src="/logo.png" alt="Logo" className="w-full" />
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Front Panel */}
            <div
              className="absolute inset-x-0 h-[140px] bg-[#050608]/70 backdrop-blur-2xl border border-white/10 rounded-t-xl"
              style={{ transform: "rotateX(-90deg) translateZ(120px) translateY(-70px)", transformOrigin: "top" }}
            >
               <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#f43f5e]/20 to-transparent" />
               <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full border border-white/5 flex gap-2 items-center justify-center px-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] animate-pulse" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] animate-pulse" style={{ animationDelay: "0.5s" }} />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] animate-pulse" style={{ animationDelay: "1s" }} />
               </div>
            </div>

            {/* Right Panel */}
            <div
              className="absolute inset-y-0 w-[140px] bg-[#050608]/70 backdrop-blur-2xl border border-white/10 rounded-t-xl"
              style={{ transform: "rotateY(90deg) translateZ(120px) translateX(70px)", transformOrigin: "right" }}
            >
               <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#9eff00]/10 to-transparent" />
               <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-black shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#9eff00]/20 blur-md" />
               </div>
            </div>

            {/* Back Panel */}
            <div
              className="absolute inset-x-0 h-[140px] bg-[#050608]/80 backdrop-blur-3xl border border-white/10 rounded-t-xl"
              style={{ transform: "rotateX(90deg) translateZ(120px) translateY(70px)", transformOrigin: "bottom" }}
            />

            {/* Left Panel */}
            <div
              className="absolute inset-y-0 w-[140px] bg-[#050608]/80 backdrop-blur-3xl border border-white/10 rounded-t-xl"
              style={{ transform: "rotateY(-90deg) translateZ(120px) translateX(-70px)", transformOrigin: "left" }}
            />

          </div>
        </div>
      </motion.div>
    </div>
  );
}