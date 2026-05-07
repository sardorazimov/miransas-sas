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


const EdgeNode = ({ x, y, color, label }: { x: number; y: number; color: string; label: string }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
    style={{ left: x, top: y, transformStyle: "preserve-3d", zIndex: 10 }}
  >
    {/* Floor Contact Shadow & Bloom */}
    <div className="absolute w-[200px] h-[200px] rounded-full mix-blend-screen pointer-events-none" style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`, transform: "translateZ(-1px)" }} />
    
    {/* Ripple Rings */}
    <motion.div className="absolute inset-[-50px] rounded-full border border-white/20" style={{ borderColor: color }} animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} />
    <motion.div className="absolute inset-[-50px] rounded-full border border-white/20" style={{ borderColor: color }} animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }} />
    
    {/* Physical Ring Base */}
    <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-[#050608] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_2px_1px_rgba(255,255,255,0.1),inset_0_-2px_1px_rgba(0,0,0,0.8)] border border-white/5">
      {/* Inner Glowing Portal */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black shadow-[inset_0_5px_20px_rgba(0,0,0,0.9)]">
        <div className="w-full h-full rounded-full animate-pulse" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 80%)`, filter: "blur(8px)" }} />
        <div className="w-8 h-8 rounded-full border-2 border-white/20 absolute" style={{ borderColor: color, boxShadow: `0 0 15px ${color}` }} />
      </div>
    </div>

    {/* Standing 3D Label */}
    <div
      className="absolute top-40 font-mono text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm bg-black/90 border border-white/10 backdrop-blur-md"
      style={{
        color,
        transform: "rotateZ(-45deg) rotateX(-60deg) translateZ(30px)",
        boxShadow: `0 10px 20px rgba(0,0,0,0.8), 0 0 15px ${color}20`
      }}
    >
      {label}
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

// ── 3. HEAVY FILE BLOCK (Cartridge) ──
const FileBlock = ({ delay, isInput }: { delay: number; isInput: boolean }) => {
  const file = INPUT_FILES[Math.floor(Math.random() * INPUT_FILES.length)];

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        x: isInput ? [-300, 100] : [-100, 300], // Travel into the core, then out
        opacity: isInput ? [0, 1, 1, 0] : [0, 1, 1, 0], // Fade near the core's center
      }}
      transition={{ duration: ANIM_DURATION, repeat: Infinity, ease: "linear", delay: -delay, times: [0, 0.1, 0.9, 1] }}
    >
      {/* 3D Physical Structure */}
      <div className="relative w-16 h-16" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Soft Contact Shadow */}
        <div className="absolute inset-0 bg-black/80 blur-md transform translateZ(2px) scale-110" />
        <div className="absolute inset-0 bg-black blur-sm transform translateZ(4px) translate-y-2 scale-100" />
        
        {/* Metallic Cartridge Body */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1e2233] to-[#0f111a] rounded-xl flex items-center justify-center overflow-hidden border border-white/5"
          style={{
            transform: "translateZ(20px)", // Elevated off the belt
            boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.1), inset -1px -1px 4px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)"
          }}
        >
          {/* Glass Top Reflection */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {isInput ? (
            <div className="flex flex-col items-center justify-center gap-1 z-10">
              <file.Icon className={`w-6 h-6 ${file.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`} strokeWidth={1.5} />
              <span className={`font-mono text-[8px] font-bold ${file.color}`}>{file.label}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-[#9eff00]/30 blur-xl mix-blend-screen" />
              <CheckCircle2 className="w-8 h-8 text-[#9eff00] drop-shadow-[0_0_12px_#9eff00]" strokeWidth={2.5} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ── 4. MECHANICAL CONVEYOR BELT ──
const Belt = ({ x, y, w, h, rotate, isInput }: { x: number; y: number; w: number; h: number; rotate: number; isInput: boolean }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20"
    style={{ left: x, top: y, width: w, height: h, transform: `rotate(${rotate}deg)`, transformStyle: "preserve-3d" }}
  >
    {/* Heavy Floor Shadow */}
    <div className="absolute inset-0 bg-black/90 blur-xl transform translateZ(-2px) scale-y-150 scale-x-105" />

    {/* Metal Side Rails (Creates thickness) */}
    <div className="absolute inset-0 bg-[#08090d] border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.9)] rounded-sm" />
    
    {/* Moving Rubber Segmented Track */}
    <div className="absolute inset-y-1 inset-x-0 bg-[#040507] border-y border-black overflow-hidden flex items-center">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent 0px, transparent 30px, rgba(255,255,255,0.05) 30px, rgba(255,255,255,0.05) 32px, #000 32px, #000 34px)",
          backgroundSize: "34px 100%",
          animation: `mrs-belt-scroll 2s linear infinite ${isInput ? "reverse" : ""}`,
        }}
      />
    </div>
    
    {/* Inner Shadows for depth */}
    <div className="absolute inset-y-1 inset-x-0 shadow-[inset_0_5px_10px_rgba(0,0,0,0.8),inset_0_-5px_10px_rgba(0,0,0,0.8)] pointer-events-none" />

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
        @keyframes mrs-belt-scroll { 0% { background-position: 0 0; } 100% { background-position: 34px 0; } }
        @keyframes core-pulse { 
          0%, 100% { filter: drop-shadow(0 0 50px rgba(244,63,94,0.6)); transform: translateZ(80px) scale(1); } 
          50% { filter: drop-shadow(0 0 100px rgba(244,63,94,1)); transform: translateZ(80px) scale(1.02); } 
        }
        @keyframes float-m {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 15px rgba(244,63,94,0.6)); }
          50% { transform: translateY(-8px); filter: drop-shadow(0 0 25px rgba(244,63,94,1)); }
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

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none mix-blend-screen w-full px-4">
        {/* <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
          THE V-CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9eff00] to-[#00ffd1]">REACTOR.</span>
        </h1>
        <p className="font-mono text-sm text-slate-400 max-w-xl mx-auto drop-shadow-lg">
          Heavy-duty distributed file processing. Drop your code into the local nodes, let the core compile it, and ship straight to the edge.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 pointer-events-auto">
          <button className="bg-[#9eff00] text-black px-8 py-3.5 rounded-md font-bold text-sm hover:bg-[#aeff33] transition-colors shadow-[0_0_30px_rgba(158,255,0,0.2)] flex items-center gap-2 border border-[#9eff00]">
            <Terminal className="w-4 h-4" /> Initialize Core
          </button>
        </div> */}
      </div>

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

          {/* === THE CORE REACTOR === 
              Built to sit ON TOP of the belts. 
              Side panels use backdrop-blur so the belts "disappear" inside.
          */}
          <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-40" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Core Shadow on Floor */}
            <div className="absolute inset-[-40px] bg-black/90 blur-2xl transform translateZ(0px)" />

            {/* Inner Red Plasma Ball */}
            <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-[#f43f5e] rounded-full mix-blend-screen" style={{ animation: "core-pulse 3s ease-in-out infinite" }} />
            
            {/* Core Top Roof (Solid Metallic) */}
            
            {/* GERÇEK 3D KAPAK (ROOF) BİLEŞENİ */}
            <div
              className="absolute inset-0"
              style={{
                transform: "translateZ(140px)", // Makinenin en üstü
                transformStyle: "preserve-3d",
              }}
            >
              {/* 1. Üst Yüzey (Ortasına maskeyle fiziksel bir delik açtık) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1] to-[#0a0c10] border border-white/20 rounded-[2rem] overflow-hidden"
                style={{
                  boxShadow: "inset 2px 2px 4px rgba(62, 189, 16, 0.1), inset -2px -2px 10px rgba(13, 143, 54, 0.9), 0 20px 50px rgba(72, 191, 21, 0.8)",
                  maskImage: "radial-gradient(circle at center, transparent 95px, black 96px)",
                  WebkitMaskImage: "radial-gradient(circle at center, transparent 95px, black 96px)",
                }}
              />

              {/* 2. Kraterin Duvarları (Z-ekseninde üst üste dizilmiş 10 adet siyah halka ile derinlik) */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`hole-wall-${i}`}
                  className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-[#030406]"
                  style={{ transform: `translateZ(${-i * 2}px)` }}
                />
              ))}

              {/* 3. Kraterin Tabanı (-20px aşağıda) ve İçinden Yükselen Kaide */}
              <div
                className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#020203] shadow-[inset_0_20px_50px_rgba(0,0,0,1)] flex items-center justify-center"
                style={{ transform: "translateZ(-20px)", transformStyle: "preserve-3d" }}
              >
                
                {/* Kaidenin 3D Gövdesi (6 Katmanlı Silindir ile yukarı çıkıyoruz) */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`pedestal-${i}`}
                    className="absolute w-32 h-32 rounded-full bg-[#0a0c10] border border-[#11131c]"
                    style={{ transform: `translateZ(${i * 2}px)` }}
                  />
                ))}

                {/* Kaidenin Üst Cam Yüzeyi (12px yukarıda) */}
                <div
                  className="absolute w-32 h-32 rounded-full border border-white/10 bg-[#11131c] flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_0_2px_5px_rgba(255,255,255,0.05)]"
                  style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}
                >
                  {/* SSM Logosu (Kaidenin üzerinde, havada süzülür) */}
                  <div style={{ transform: "translateZ(15px)", animation: "float-m 4s ease-in-out infinite" }}>
                    <span className="font-sans text-5xl font-black italic text-[#f43f5e] drop-shadow-[0_0_20px_rgba(244,63,94,0.8)] tracking-tighter">
                       <img src="/vercel.svg" alt="" className="w-full" />
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
               {/* Ambient wall glow from inside */}
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