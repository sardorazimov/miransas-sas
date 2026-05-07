"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileCode, FileText, FileSpreadsheet, FileArchive,
  CheckCircle2, Zap, Globe, Database, Cloud
} from "lucide-react";

// ============================================================================
// KONFİGÜRASYON
// ============================================================================
const ANIM_DURATION = 14; 
const ITEMS_COUNT = 6; 
const ROSE = "#f43f5e";
const LIME = "#9eff00";

const FILES = [
  { Icon: FileCode, label: ".go", color: "text-sky-400" },
  { Icon: FileText, label: ".rs", color: "text-rose-400" },
  { Icon: FileCode, label: ".tsx", color: "text-cyan-400" },
  { Icon: FileSpreadsheet, label: ".yml", color: "text-violet-400" },
];

// ============================================================================
// 1. CARTRIDGE (Yürüyen Dosyalar)
// ============================================================================
function Cartridge({ index, delayOffset = 0 }: { index: number; delayOffset?: number }) {
  const file = FILES[index % FILES.length];
  const delay = `${-((ANIM_DURATION / ITEMS_COUNT) * index + delayOffset)}s`;

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 w-[60px] h-[60px] z-20"
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
// 2. CUBE FACE (Deliği Fiziksel Olarak Kesen Duvarlar)
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
        // FİZİKSEL DELİK AÇAN MASKE
        maskImage: isSide ? "radial-gradient(circle at center, transparent 48px, black 49px)" : "none",
        WebkitMaskImage: isSide ? "radial-gradient(circle at center, transparent 48px, black 49px)" : "none",
      }}
    >
      <div className={`absolute inset-0 border-2 border-[#1f2233] rounded-[2.5rem] ${type === 'bottom' ? 'bg-black' : 'bg-gradient-to-br from-[#12141f] to-[#05060a]'}`} style={{ boxShadow: "inset 0 0 60px #000" }} />
      {isSide && (
        <div className="absolute w-[98px] h-[98px] rounded-full border-4 shadow-[0_0_20px_currentColor]" style={{ color: glowColor, opacity: 0.2 }} />
      )}
    </div>
  );
}

// ============================================================================
// 3. OTOBAN (BELT)
// ============================================================================
function ConveyorBelt({ rotate, delayOffset = 0, reverse = false }: { rotate: number; delayOffset?: number; reverse?: boolean }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[70px] z-20 py-4"
      style={{ transform: `translateZ(120px) rotate(${rotate}deg)`, transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-[#08090d] border-y-4 border-[#1f2233] shadow-[0_40px_60px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-y-1 inset-x-0 bg-[#020305] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg, transparent 0px, transparent 36px, rgba(255,255,255,0.05) 36px, rgba(255,255,255,0.05) 40px, #000 40px, #000 44px)", backgroundSize: "44px 100%", animation: `vcore-belt-scroll 2s linear infinite ${reverse ? 'reverse' : ''}` }} />
      </div>
      <div className="absolute inset-0 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {Array.from({ length: ITEMS_COUNT }).map((_, i) => <Cartridge key={i} index={i} delayOffset={delayOffset} />)}
      </div>
      {/* Tünel içi karanlık yorganı */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[80px] z-30 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent 0%, #000 25%, #000 75%, transparent 100%)", transform: "translateZ(15px)" }} />
    </div>
  );
}

// ============================================================================
// 4. ANA SAHNE (X-REACTOR FINAL)
// ============================================================================
export default function MiransasFinalXCore() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020203] selection:bg-[#9eff00] selection:text-black">
      
      <style jsx global>{`
        @keyframes vcore-belt-scroll { 0% { background-position: 0 0; } 100% { background-position: 44px 0; } }
        @keyframes vcore-item-flow { 0% { left: 100%; } 100% { left: 0%; } }
        @keyframes vcore-raw-fade { 0%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }
        @keyframes vcore-out-fade { 0%, 45% { opacity: 0; } 55%, 100% { opacity: 1; } }
        @keyframes ssm-rotate { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(-360deg); } }
      `}</style>

      {/* --- ISOMETRIC WORLD --- */}
      <div className="relative w-full h-[850px] flex items-center justify-center pointer-events-none" style={{ perspective: "2500px" }}>
        <div className="relative w-[1200px] h-[1200px]" style={{ transform: "rotateX(60deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}>
          
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px", transform: "translateZ(-5px)" }} />

          {/* 1. ARKA YÜZEYLER (Bantların Arkası) */}
          <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-10" style={{ transformStyle: "preserve-3d" }}>
             <CubeFace transform="translateZ(-120px) rotateY(180deg) " type="bottom" />
             <CubeFace transform="translateY(-120px) rotateX(90deg)" type="output" />
             <CubeFace transform="translateX(-120px) rotateY(-90deg)" type="input" />
          </div>

          {/* 2. X-BANTLAR (Tam ortadaki delikten geçer) */}
        <div className="pt-20">
         <ConveyorBelt rotate={0} />
        <ConveyorBelt rotate={-90} delayOffset={1.2} reverse />

        </div>
          {/* 3. ÖN YÜZEYLER (Bantların Önü) */}
          <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 z-40 " style={{ transformStyle: "preserve-3d" }}>
             <CubeFace transform="translateY(120px) rotateX(-90deg)" type="input" />
             <CubeFace transform="translateX(120px) rotateY(90deg)" type="output" />
             
             {/* --- ÜST KAPAK & DÖNEN MARQUEE --- */}
             <div className="absolute inset-0" style={{ transform: "translateZ(240px)", transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e2233] to-[#0a0c10] border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_#000]" style={{ maskImage: "radial-gradient(circle, transparent 85px, black 86px)", WebkitMaskImage: "radial-gradient(circle, transparent 85px, black 86px)" }} />
                
                {/* DÖNEN MARQUEE RING (Resimdeki gibi) */}
                <div className="absolute top-1/2 left-1/2 w-[170px] h-[170px] -translate-x-1/2 -translate-y-1/2 " style={{ transform: "translateZ(-15px)", transformStyle: "preserve-3d" }}>
                  <div className="relative w-full h-full" style={{ animation: "ssm-rotate 12s linear infinite", transformStyle: "preserve-3d" }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] font-black text-[#f43f5e] whitespace-nowrap" style={{ transform: `rotateZ(${i * 90}deg) translateY(-58px) rotateX(-90deg)`, filter: "drop-shadow(0 0 5px #f43f5e)" }}>
                        SSM • MIRANSAS • PIPELINE •
                      </div>
                    ))}
                  </div>
                </div>

                {/* CENTRAL M LOGO */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#05060a] border-4 border-[#0a0c12] flex items-center justify-center shadow-[inset_0_5px_15px_#000]" style={{ transform: "translateZ(-20px)" }}>
                  <div className="w-20 h-20 rounded-full bg-[#11141f] border border-white/5 flex items-center justify-center shadow-[0_10px_20px_#000]">
                    <span className="font-sans text-5xl font-black italic text-rose-500 drop-shadow-[0_0_15px_#f43f5e]">M</span>
                  </div>
                </div>
             </div>
          </div>

          {/* DÜĞÜMLER (Otobanların Uçları) */}
          {/* <Node x={150} y={250} color={ROSE} label="Localhost" icon={Cloud} />
          <Node x={950} y={950} color={LIME} label="Edge Network" icon={Globe} />
          <Node x={250} y={1050} color={ROSE} label="Ingest DB" icon={Database} />
          <Node x={950} y={150} color={LIME} label="Production" icon={Zap} /> */}

        </div>
      </div>
    </div>
  );
}

// ── YARDIMCI BİLEŞENLER ──

function Node({ x, y, color, label, icon: Icon }: { x: number; y: number; color: string; label: string; icon: any }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2  z-50 flex flex-col items-center justify-center" style={{ left: x, top: y, transformStyle: "preserve-3d" }}>
      <div className="absolute w-[200px] h-[200px] rounded-full mix-blend-screen" style={{ background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`, transform: "translateZ(-2px)" }} />
      <div className="w-20 h-20 rounded-full border-4 border-[#0a0c12] bg-[#050608] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,1)]">
        <Icon className="w-7 h-7 opacity-80" style={{ color, filter: `drop-shadow(0 0 10px ${color})` }} />
      </div>
      <div className="absolute top-24 font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-black/90 border border-white/10 rounded backdrop-blur-md" style={{ color, transform: "rotateZ(-45deg) rotateX(-60deg) translateZ(40px)" }}>
        {label}
      </div>
    </div>
  );
}