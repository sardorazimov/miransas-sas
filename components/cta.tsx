"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Copy, Check, Zap } from "lucide-react";

export default function MiransasCTA() {
  const [copied, setCopied] = useState(false);
  const installCommand = "curl -sS https://miransas.io/install | bash";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#020203] py-32 font-sans selection:bg-rose-500 selection:text-white pt-20">
      
      {/* ============================================================== */}
      {/* ARKA PLAN EFEKTLERİ (Grid & Merkez Lazer Glow)                 */}
      {/* ============================================================== */}
      
      {/* Arka plan sönük ızgara (Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Merkezdeki devasa kırmızı enerji parlaması */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-500/10 blur-[120px] pointer-events-none rounded-[100%]" />

      {/* Yatay ince lazer çizgisi */}
      <motion.div 
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        
        {/* ============================================================== */}
        {/* BAŞLIK & METİN                                                 */}
        {/* ============================================================== */}
        
        {/* Üst Rozet */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1.5 backdrop-blur-md"
        >
          <Zap className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-rose-500 uppercase">
            Ignite Your Infrastructure
          </span>
        </motion.div>

        {/* Ana Başlık */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white drop-shadow-xl"
        >
          Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Miransas</span> Core <br />
          in Seconds.
        </motion.h2>

        {/* Alt Metin */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-sm md:text-base font-mono text-white/50 leading-relaxed"
        >
          Stop wrestling with complex configurations. Get the lightning-fast, self-hosted Rust tunneling engine running on your system with a single command.
        </motion.p>

        {/* ============================================================== */}
        {/* TERMINAL MOCKUP (Kurulum Kodu)                                 */}
        {/* ============================================================== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 mb-12 w-full max-w-xl group relative rounded-2xl border border-white/10 bg-[#0a0c14]/80 p-1 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* İçeriden sızan hafif lazer efekti */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/0 via-rose-500/5 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center justify-between rounded-xl bg-black/60 px-4 py-3 border border-white/5">
            <div className="flex items-center gap-3 overflow-hidden">
              <Terminal className="h-4 w-4 text-rose-500 shrink-0" />
              <code className="font-mono text-xs md:text-sm text-slate-300 truncate">
                {installCommand}
              </code>
            </div>
            
            {/* Kopyala Butonu */}
            <button 
              onClick={handleCopy}
              className="ml-4 shrink-0 rounded-md bg-white/5 p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors border border-white/5"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* AKSİYON BUTONLARI (CTA)                                        */}
        {/* ============================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-5 relative z-20"
        >
          {/* BEYAZ GLOW BUTON */}
          <button className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]">
            <span className="relative z-10 text-xs font-mono font-black text-black tracking-[0.2em] uppercase">
              Read Documentation
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 text-black transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-200 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          {/* HAYALET (GHOST) BUTON */}
          <button className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/5 px-8 py-4 backdrop-blur-md transition-all hover:scale-105 hover:bg-rose-500/10 hover:border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0)] hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]">
            <span className="text-xs font-mono font-bold text-white tracking-[0.2em] uppercase">
              View on GitHub
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}