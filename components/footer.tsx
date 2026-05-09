"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative border-t border-rose-500/10 bg-[#020203] px-6 md:px-12 py-16 overflow-hidden">
      
      {/* ============================================================== */}
      {/* ARKA PLAN ATMOSFER IŞIĞI (Diplerden Vuran Kırmızı Lazer Glow)  */}
      {/* ============================================================== */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-rose-500/10 blur-[120px] pointer-events-none" />

      {/* Üst Kısım */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row mb-16">
        
        {/* ============================================================== */}
        {/* LOGO & TAGLINE                                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 cursor-pointer group">
            {/* Logo Kutusu */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-900/50 to-black border border-rose-500/30 shadow-[inset_0_0_10px_rgba(244,63,94,0.2)] transition-shadow group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <span className="text-xl font-black italic text-rose-500 drop-shadow-[0_0_8px_#f43f5e]">M</span>
            </div>
            {/* Marka */}
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white">
                Miransas <span className="text-rose-500">Core</span>
              </span>
            </div>
          </div>
          <p className="font-mono text-[10px] tracking-[0.4em] text-rose-500/60 uppercase font-bold border border-rose-500/10 bg-rose-500/5 w-fit px-3 py-1 rounded-full">
            High Performance Engine
          </p>
        </div>

        {/* ============================================================== */}
        {/* LINKLER (Miransas Ekosistemine Uygun)                          */}
        {/* ============================================================== */}
        <div className="flex flex-wrap gap-12 md:gap-20">
          
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-2 border-b border-white/5 pb-2">
              Ecosystem
            </span>
            {["Binboi Tunnel", "Rust CLI Agent", "Control Plane", "Miransoft"].map(l => (
              <a key={l} href="#" className="font-mono text-xs tracking-wider text-white/50 hover:text-rose-400 hover:translate-x-1 transition-all duration-300">
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-2 border-b border-white/5 pb-2">
              Resources
            </span>
            {["Documentation", "API Reference", "GitHub Repo", "System Status"].map(l => (
              <a key={l} href="#" className="font-mono text-xs tracking-wider text-white/50 hover:text-rose-400 hover:translate-x-1 transition-all duration-300">
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-2 border-b border-white/5 pb-2">
              Company
            </span>
            {["About Studio", "Dev Blog", "Privacy Policy", "Contact"].map(l => (
              <a key={l} href="#" className="font-mono text-xs tracking-wider text-white/50 hover:text-rose-400 hover:translate-x-1 transition-all duration-300">
                {l}
              </a>
            ))}
          </div>

        </div>

        {/* ============================================================== */}
        {/* CTA BUTTON (Ateş Eden Beyaz Neon Buton)                        */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-4 items-start md:items-end w-full md:w-auto mt-8 md:mt-0">
          <button
            className="group relative px-8 py-4 rounded-full bg-white text-black font-mono font-black text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]"
          >
            {/* İçerden Vuran Kırmızı Yansıma */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.15), transparent)' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Initialize Node <span className="text-rose-500 text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
          <p className="font-mono text-[9px] text-white/30 tracking-[0.4em] mt-1">
            OPEN SOURCE COMMUNITY
          </p>
        </div>

      </div>

      {/* ============================================================== */}
      {/* DIVIDER (Lazer Çizgisi)                                        */}
      {/* ============================================================== */}
      <div className="relative mx-auto max-w-7xl w-full h-[1px] mb-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ============================================================== */}
      {/* ALT KISIM (Telif, Sosyal Medya ve Sistem Durumu)               */}
      {/* ============================================================== */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between gap-6">
        
        <p className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">
          © 2026 Miransas. All rights reserved.
        </p>

        <div className="flex items-center gap-8">
          {["Discord", "GitHub", "Twitter"].map(s => (
            <a key={s} href="#" className="font-mono text-[10px] font-bold text-white/30 hover:text-white tracking-[0.2em] uppercase transition-colors duration-200">
              {s}
            </a>
          ))}
        </div>

        {/* Gerçekçi Sunucu Durum İndikatörü */}
        <div className="flex items-center gap-3 border border-white/5 bg-white/[0.02] px-4 py-2 rounded-full">
          <div className="relative flex h-2 w-2 items-center justify-center">
            {/* Buradaki yeşili özellikle bıraktım çünkü sistem "Online" ışığı genelde yeşil olur, gerçekçi durur */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
          <span className="font-mono text-[9px] font-bold text-white/40 tracking-[0.3em] uppercase">
            All Systems Operational
          </span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;