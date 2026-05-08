import React from 'react';

const SynthChatUI = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sol Taraf - Advanced Code Workflow */}
        <div className="lg:col-span-5 bg-[#1A1A1F] rounded-3xl p-10 border border-white/5">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Advanced Code<br />
            <span className="bg-gradient-to-r from-[#39FF9F] to-[#00FF9D] bg-clip-text text-transparent">
              Workflow Automation
            </span>
          </h1>

          <button className="mt-6 px-8 py-4 bg-[#39FF9F] hover:bg-[#22FFAA] text-black font-semibold rounded-full flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_30px_rgba(57,255,159,0.5)]">
            Explore All Features →
          </button>

          <p className="mt-8 text-[#A1A1AA] text-lg leading-relaxed">
            Build intelligent automated workflows using clean, customizable code...
          </p>

          {/* Dil Listesi */}
          <div className="mt-12 bg-[#111113] rounded-2xl p-6">
            {/* Dil listesi buraya */}
          </div>
        </div>

        {/* Sağ Taraf - Kod Bloğu */}
        <div className="lg:col-span-7 bg-[#0F0F12] rounded-3xl p-8 border border-[#39FF9F]/20 overflow-hidden">
          <div className="bg-[#1A1A1F] rounded-2xl p-6 font-mono text-sm leading-relaxed">
            <pre className="text-[#39FF9F]">
{`1  import React, { useState } from "react";
2  import { Card, CardContent } from "@/components";

5  export default function AIChatSection() {
6    const [messages, setMessages] = useState([]);`}
            </pre>
          </div>
        </div>

        {/* SynthChat AI Bölümü */}
        <div className="lg:col-span-12 mt-8 bg-gradient-to-br from-[#1A1A1F] to-[#111113] rounded-3xl p-12 border border-[#39FF9F]/10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-tight">SYNTHCHAT AI</h2>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            {/* Icon butonlar */}
            {['🔄', '🔗', '🌀', '✨', '🔥', '⚡'].map((icon, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-[#1F1F24] hover:bg-[#39FF9F]/10 border border-white/10 hover:border-[#39FF9F] rounded-2xl flex items-center justify-center text-3xl transition-all cursor-pointer"
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Merkezi Büyük Buton */}
          <div className="flex justify-center mt-12">
            <div className="w-28 h-28 bg-gradient-to-br from-[#39FF9F] to-[#00FF9D] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(57,255,159,0.7)] cursor-pointer hover:scale-110 transition-transform">
              <span className="text-5xl">🔗</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynthChatUI;