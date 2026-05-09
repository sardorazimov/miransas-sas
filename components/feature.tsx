"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  TerminalSquare, ShieldCheck, Zap, Globe2, 
  Cpu, Layers, Activity, 
  Loader2
} from "lucide-react";

// ============================================================================
// BENTO CARD COMPONENT (Inner Glow & Borderless Premium Edition)
// ============================================================================
type BentoTheme = "rose" | "lime" | "cyan" | "amber";

type BentoCardProps = {
  title: string;
  description: string;
  className?: string;
  themeColor: BentoTheme;
  Icon: any;
  children?: React.ReactNode;
};

const THEMES = {
  rose: { bg: "bg-rose-500", text: "text-rose-500", gradient: "from-rose-500", shadow: "shadow-rose-500/20" },
  lime: { bg: "bg-[#9eff00]", text: "text-[#9eff00]", gradient: "from-[#9eff00]", shadow: "shadow-[#9eff00]/20" },
  cyan: { bg: "bg-cyan-400", text: "text-cyan-400", gradient: "from-cyan-400", shadow: "shadow-cyan-400/20" },
  amber: { bg: "bg-amber-500", text: "text-amber-500", gradient: "from-amber-500", shadow: "shadow-amber-500/20" },
};

const BentoCard = ({ title, description, className, themeColor, Icon, children }: BentoCardProps) => {
  const theme = THEMES[themeColor];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#050507] z-10 shadow-2xl transition-all duration-500 hover:-translate-y-1",
        className
      )}
    >
      {/* ====================================================================== */}
      {/* İÇ GLOW (AURA) EFEKTİ - Tıpkı Log kartlarındaki gibi!                  */}
      {/* ====================================================================== */}
      {/* 1. Üstten aşağı süzülen gradient (Hover'da canlanır) */}
      <div className={cn(
        "absolute inset-0 h-[60%] bg-gradient-to-b to-transparent opacity-10 transition-opacity duration-700 group-hover:opacity-30 pointer-events-none z-0",
        theme.gradient
      )} />
      
      {/* 2. Sağ üst köşeye yoğunlaşan soft blur aura */}
      <div className={cn(
        "absolute -top-20 -right-10 w-80 h-80 rounded-full blur-[90px] opacity-10 transition-opacity duration-700 group-hover:opacity-40 pointer-events-none z-0",
        theme.bg
      )} />

      {/* İÇERİK (Görsel Bölüm - Animasyonlar ve Grafikler) */}
      <div className="relative z-10 flex-1 overflow-hidden p-8 flex flex-col justify-center min-h-[180px]">
        {children}
      </div>

      {/* ALT BİLGİ (Metin ve İkon) */}
      <div className="relative z-10 flex flex-col gap-3 p-8 pt-0 mt-auto bg-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/[0.03] shadow-inner relative overflow-hidden group-hover:bg-white/[0.06] transition-colors duration-500">
             <Icon className={cn("h-5 w-5 relative z-10", theme.text)} />
          </div>
          <h3 className="text-xl font-black tracking-tight text-white drop-shadow-md">{title}</h3>
        </div>
        <p className="text-sm font-mono text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN BENTO GRID SECTION
// ============================================================================
export function MiransasBentoGrid() {
  return (
    <section className="w-full flex flex-col items-center py-32 bg-[#020203] selection:bg-rose-500 selection:text-white overflow-hidden">
      
      {/* BAŞLIK SCROLL ANIMASYONU */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20 flex flex-col items-center px-6"
      >
        <div className="flex items-center justify-center p-4 rounded-2xl bg-[#050507] mb-6 shadow-2xl relative overflow-hidden">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-[#9eff00]/30 rounded-2xl" />
          <Layers className="h-8 w-8 text-[#9eff00] relative z-10" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white drop-shadow-xl">
          Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#9eff00]">Infrastructure</span>
        </h2>
        <p className="mt-8 max-w-2xl text-sm md:text-base font-mono text-slate-500 leading-relaxed">
          The ultimate foundation for your systems. Built on high-performance Rust, ensuring zero latency, memory safety, and global scalability.
        </p>
      </motion.div>

      {/* BENTO GRID KAPSAYICISI (STAGGERED REVEAL) */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-[1400px] px-6 lg:px-12"
      >
        
        {/* ========================================================= */}
        {/* KART 1: RUST ENGINE (Dev Boyut - 2 Sütun, 2 Satır)          */}
        {/* ========================================================= */}
        <BentoCard 
          title="High-Performance Rust"
          description="Built entirely in Rust. No garbage collector pauses, bare-metal performance, and fearless concurrency out of the box."
          themeColor="rose"
          Icon={TerminalSquare}
          className="md:col-span-2 lg:col-span-2 md:row-span-2"
        >
          {/* İç Görsel: Etkileşimli Terminal Simülasyonu */}
          <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#0a0a0c] border border-white/5 p-5 relative overflow-hidden flex flex-col font-mono text-xs shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-5 border-b border-white/5 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="ml-3 text-[10px] text-slate-600 uppercase tracking-widest">miransas_core_cli</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.5 }}
              className="text-slate-400 flex items-center gap-2"
            >
              <span className="text-rose-500">~</span> <span className="text-white">cargo run --release</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.2 }}
              className="text-[#9eff00] mt-3"
            >
              [+] Compiling miransas-engine v4.0.0
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.2 }}
              className="text-slate-400 mt-1"
            >
              Building [=========================] 98%
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.2 }}
              className="text-[#9eff00] mt-1"
            >
              [+] Finished release [optimized] target(s) in 0.12s
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2, duration: 0.5 }}
              className="mt-4 p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3"
            >
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-4 w-4">
                  <Loader2 className="h-full w-full text-rose-500" />
                </motion.div>
               <span className="text-white font-bold tracking-wide">Core Engine Active on port 8080.</span>
            </motion.div>
          </div>
        </BentoCard>

        {/* ========================================================= */}
        {/* KART 2: ZERO LATENCY (Orta Boy - 1 Sütun)                   */}
        {/* ========================================================= */}
        <BentoCard 
          title="Zero Latency"
          description="Optimized networking paths ensuring sub-millisecond response times globally."
          themeColor="amber"
          Icon={Zap}
          className="md:col-span-1 lg:col-span-1"
        >
           {/* İç Görsel: Hızla akan lazer çizgileri */}
           <div className="flex flex-col justify-center h-full gap-5 relative w-full overflow-hidden px-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                  <motion.div 
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                    className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent blur-[1px]"
                  />
                </div>
              ))}
           </div>
        </BentoCard>

        {/* ========================================================= */}
        {/* KART 3: MEMORY SAFETY (Orta Boy - 1 Sütun)                  */}
        {/* ========================================================= */}
        <BentoCard 
          title="Memory Safe"
          description="Strict borrow checking eliminates data races and panic states."
          themeColor="cyan"
          Icon={ShieldCheck}
          className="md:col-span-1 lg:col-span-1"
        >
          {/* İç Görsel: Atan Siber Kalkan */}
          <div className="flex items-center justify-center h-full">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center h-24 w-24 rounded-full border border-cyan-400/20 bg-cyan-400/5 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
            >
              <ShieldCheck className="h-10 w-10 text-cyan-400" />
              <div className="absolute inset-0 rounded-full blur-[20px] bg-cyan-400/20" />
            </motion.div>
          </div>
        </BentoCard>

        {/* ========================================================= */}
        {/* KART 4: GLOBAL EDGE (Yatay Geniş - 2 Sütun)                 */}
        {/* ========================================================= */}
        <BentoCard 
          title="Global Edge Network"
          description="Deploy your nodes instantly across 45+ regions globally. Intelligent traffic routing keeps your instances online."
          themeColor="lime"
          Icon={Globe2}
          className="md:col-span-3 lg:col-span-2"
        >
          {/* İç Görsel: Bağlantı Noktaları (Radar Nodes) */}
          <div className="flex items-center justify-around h-full w-full relative pt-4 pb-8">
             {/* Kılavuz Bağlantı Çizgisi */}
             <div className="absolute top-[40%] left-10 right-10 h-[1px] bg-white/10 -translate-y-1/2" />
             
             {["US-EAST", "EU-WEST", "AP-SOUTH", "SA-EAST"].map((node, i) => (
               <div key={node} className="relative z-10 flex flex-col items-center gap-3">
                 <div className="h-5 w-5 rounded-full bg-[#0a0a0c] border border-[#9eff00]/50 flex items-center justify-center relative shadow-lg">
                   {/* Radar Dalgası */}
                   <motion.div 
                    animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute inset-0 rounded-full bg-[#9eff00]"
                   />
                   {/* Merkez Nokta */}
                   <div className="h-2 w-2 rounded-full bg-[#9eff00] shadow-[0_0_10px_#9eff00]" />
                 </div>
                 <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider bg-black/50 px-2 py-1 rounded-md border border-white/5">{node}</span>
               </div>
             ))}
          </div>
        </BentoCard>

      </motion.div>
    </section>
  );
}