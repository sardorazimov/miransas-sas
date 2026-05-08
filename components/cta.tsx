"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Check, Code2, Cpu, Globe, 
  MessageSquare, Zap, Terminal, Sparkles
} from "lucide-react";

// ============================================================================
// RENK PALETİ (Resimdeki Premium Kodlar)
// ============================================================================
const LIME = "#9eff00";
const BG_DARK = "#020203";
const CARD_BG = "rgba(255, 255, 255, 0.03)";

// ============================================================================
// 1. NEON BUTON BİLEŞENİ
// ============================================================================
const NeonButton = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative flex items-center gap-2 rounded-full bg-[#9eff00] px-6 py-3 text-sm font-bold text-black transition-shadow hover:shadow-[0_0_30px_rgba(158,255,0,0.4)]"
  >
    {children}
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </motion.button>
);

// ============================================================================
// 2. KOD EDİTÖRÜ MOCKUP
// ============================================================================
const CodeMockup = () => {
  const lines = [
    { num: 1, content: "import React, { useState } from \"react\";", color: "text-purple-400" },
    { num: 2, content: "import { Card } from \"@/components/ui\";", color: "text-blue-400" },
    { num: 3, content: "// Initialize workflow engine", color: "text-slate-500" },
    { num: 4, content: "@state private alphacard = true;", color: "text-[#9eff00]" },
    { num: 5, content: "export default function AIChatSection() {", color: "text-purple-400" },
    { num: 6, content: "  const [status, setStatus] = useState(\"IDLE\");", color: "text-blue-300" },
    { num: 7, content: "  return <VCore.Reactor active={true} />;", color: "text-[#9eff00]" },
  ];

  return (
    <div className="relative h-full w-full rounded-2xl border border-white/10 bg-black/60 p-6 font-mono text-[13px] leading-relaxed backdrop-blur-xl">
      {/* Editör Parlaması */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#9eff00]/10 blur-[80px]" />
      
      {lines.map((line) => (
        <div key={line.num} className="flex gap-4">
          <span className="w-4 text-slate-700">{line.num}</span>
          <span className={line.color}>{line.content}</span>
        </div>
      ))}

      {/* Cursor Animasyonu */}
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-[54px] h-4 w-1.5 bg-[#9eff00]"
      />
    </div>
  );
};

// ============================================================================
// 3. SYNTHCHAT AI DİYAGRAMI (Integration)
// ============================================================================
const SynthChatAI = () => (
  <div className="relative flex h-full w-full items-center justify-center py-12">
    {/* Merkez Çekirdek */}
    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#9eff00] shadow-[0_0_50px_rgba(158,255,0,0.3)]">
      <Sparkles className="h-10 w-10 text-black" />
    </div>

    {/* Yörünge İkonları */}
    {[
      { Icon: Globe, label: "Global", delay: 0 },
      { Icon: Terminal, label: "CLI", delay: 1 },
      { Icon: Cpu, label: "Core", delay: 2 },
      { Icon: MessageSquare, label: "API", delay: 3 },
    ].map((item, i) => (
      <motion.div
        key={i}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: item.delay }}
        className="absolute h-full w-full"
      >
        <div 
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
          style={{ transform: `translateY(40px)` }}
        >
          <item.Icon className="h-5 w-5 text-white/70" />
        </div>
      </motion.div>
    ))}
  </div>
);

// ============================================================================
// ANA FEATURE SECTION
// ============================================================================
export default function AdvancedFeatures() {
  return (
    <section className="bg-[#020203] py-24 text-white">
      <div className="mx-auto max-w-7xl px-8">
        
        {/* ÜST BÜYÜK KART */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-8 grid grid-cols-1 overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent md:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-12 lg:p-16">
            <h2 className="mb-6 text-4xl font-black tracking-tight lg:text-5xl">
              Advanced Code <br />
              <span className="text-[#9eff00]">Workflow Automation</span>
            </h2>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-slate-400">
              Build intelligent automated workflows using clean, customizable code that gives full control, speed, and efficiency every time.
            </p>
            <NeonButton>Explore All Features</NeonButton>
          </div>

          <div className="relative min-h-[400px] p-8 lg:p-12">
            {/* Yeşil Arka Plan Işığı */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#9eff00]/5 to-transparent" />
            <CodeMockup />
          </div>
        </motion.div>

        {/* ALT İKİLİ GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Sol Kart: Diller */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10"
          >
            <div className="mb-8 flex flex-wrap gap-3">
              {["Spanish", "French", "Portuguese", "Japanese", "Chinese"].map((lang) => (
                <div key={lang} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
                  <Globe className="h-3 w-3 text-[#9eff00]" /> {lang}
                </div>
              ))}
            </div>
            <h3 className="mb-4 text-2xl font-bold">Multilingual Support</h3>
            <p className="text-slate-500">Deploy workflows that speak every language your team does.</p>
          </motion.div>

          {/* Sağ Kart: Synthchat AI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 overflow-hidden text-center"
          >
            <div className="absolute top-0 h-1 w-32 bg-gradient-to-r from-transparent via-[#9eff00] to-transparent" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Synthchat AI</span>
            
            <div className="h-64 w-full">
              <SynthChatAI />
            </div>

            <div className="flex gap-4">
              <div className="h-1.5 w-12 rounded-full bg-white/10" />
              <div className="h-1.5 w-12 rounded-full bg-[#9eff00]" />
              <div className="h-1.5 w-12 rounded-full bg-white/10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}