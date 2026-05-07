"use client";

import React from "react";
import { motion } from "framer-motion";
import { Laptop, Cloud, SlidersVertical, Cpu, Shield, Activity } from "lucide-react";

export default function HeroSection() {
  // SVG Çizgileri - Animasyonla çizilme efekti
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut", delay: 0.2 },
    },
  };

  // Objelerin aşağıdan/şeffaftan gelerek belirmesi
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-[#111216] text-white font-sans overflow-hidden relative selection:bg-rose-500/30">
      
      {/* --- ANA İÇERİK --- */}
      <main className="max-w-[1500px] mx-auto px-8 lg:px-16 pt-24 pb-24 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* SOL TARAF: METİNLER (5 Kolon) */}
        <div className="lg:col-span-5 flex flex-col items-start z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight"
          >
            SwarmOne AI <br />
            <span className="text-gray-100">NeoOrchestrator</span> <br />
            <span className="text-rose-500">for Evaluation.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10"
          >
            Not an evolution of vLLM or Ray. A new class entirely. 
            Neo AI orchestration built for heterogeneous silicon, 
            SLO-driven autoscaling, and lower cost per token.
          </motion.p>
        </div>

        {/* SAĞ TARAF: WİREFRAME İZOMETRİK DİYAGRAM (7 Kolon) */}
        {/* Sabit 900x700 tuval. 
          Ekran küçüldüğünde oran bozulmasın diye scale ve aspect-ratio kullanıyoruz.
        */}
        <div className="lg:col-span-7 relative w-full aspect-[9/7] max-w-[900px] mx-auto select-none pointer-events-none origin-center lg:origin-right transform scale-90 sm:scale-100">
          
          {/* 1. BAĞLANTI ÇİZGİLERİ (SVG) - Beyaz/Mavi Parlak Hatlar */}
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 900 700">
            <defs>
              <linearGradient id="glow-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#94a3b8" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.8} />
              </linearGradient>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Merkez -> Laptop (Sağ Üst) */}
            <motion.path
              d="M 450 350 L 650 200"
              stroke="url(#glow-line)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#neon-glow)"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Merkez -> Bulut (Sağ Alt) */}
            <motion.path
              d="M 450 350 L 700 500"
              stroke="url(#glow-line)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#neon-glow)"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Merkez -> GPU Rafı (Sol Alt - Zikzaklı Gidiş) */}
            <motion.path
              d="M 450 350 L 250 220 L 50 380 L 300 550"
              stroke="url(#glow-line)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#neon-glow)"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>

          {/* --- HTML OBJELERİ (Tam Koordinatlara Yerleştirilmiş) --- */}

          {/* 2. MERKEZ KUTU: NeoOrchestrator (Cam / Wireframe Görünüm) */}
          <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible"
            className="absolute left-[450px] top-[350px] -translate-x-1/2 -translate-y-1/2 z-20"
          >
            {/* Çift çizgili platform efekti */}
            <div className="absolute -bottom-4 -left-4 w-[180px] h-[130px] border border-gray-600/40 rounded-xl" />
            
            <div className="relative w-[150px] h-[100px] bg-[#1a1b23]/80 backdrop-blur-md border-[1.5px] border-gray-400/60 shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-lg flex flex-col justify-end p-4">
              
              {/* Üst İzometrik Yüzey (Kırmızı Işıklı Patern) */}
              <div className="absolute -top-[45px] left-[15px] w-[120px] h-[60px] bg-transparent border-[1.5px] border-gray-400/60 -skew-x-[45deg] origin-bottom flex items-center justify-center p-2">
                {/* Merkezden dışa yayılan kırmızı noktalar */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Activity className="absolute text-rose-500 w-8 h-8 opacity-80" />
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      className="absolute w-1 h-1 bg-rose-500 rounded-full shadow-[0_0_8px_#e11d48]"
                      style={{ transform: `rotate(${i * 45}deg) translateY(-20px)` }}
                    />
                  ))}
                </div>
              </div>

              {/* Ön Yüz Sliderlar (Kırmızı) */}
              <div className="flex justify-between items-end w-[90px] ml-1">
                <div className="w-1 h-10 bg-gray-700 rounded-full relative"><div className="absolute bottom-0 w-full h-6 bg-rose-500 rounded-full shadow-[0_0_8px_#e11d48]" /></div>
                <div className="w-1 h-10 bg-gray-700 rounded-full relative"><div className="absolute bottom-2 w-full h-4 bg-rose-500 rounded-full shadow-[0_0_8px_#e11d48]" /></div>
                <div className="w-1 h-10 bg-gray-700 rounded-full relative"><div className="absolute bottom-0 w-full h-8 bg-rose-500 rounded-full shadow-[0_0_8px_#e11d48]" /></div>
              </div>

              {/* Alt Etiket */}
              <div className="absolute -bottom-[50px] left-[-30px] flex items-center gap-2">
                <div className="text-[11px] text-gray-300 leading-tight text-right">
                  Workload-Aware <br/> Orchestration
                </div>
                <div className="bg-gray-800 border border-gray-600 px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1 font-bold text-gray-300">
                  ON <div className="w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_5px_#e11d48]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. LAPTOP (Sağ Üst - Tel Kafes Cam Görünüm) */}
          <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible"
            className="absolute left-[650px] top-[200px] -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="rotate-[20deg] -skew-x-[20deg] bg-transparent border-[1.5px] border-gray-400/60 p-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm relative">
              <Laptop className="w-24 h-24 text-gray-300/80" strokeWidth={1} />
              {/* Ekran yansıma detayı */}
              <div className="absolute top-6 left-6 w-[70px] h-[50px] bg-gradient-to-tr from-white/5 to-transparent rounded-sm" />
            </div>
          </motion.div>

          {/* 4. BULUT & ROZETLER (Sağ Alt - Neon Çerçeve) */}
          <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible"
            className="absolute left-[700px] top-[500px] -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative">
              {/* Bulut Şekli */}
              <div className="w-[180px] h-[100px] border-[2px] border-rose-500/80 bg-rose-500/10 backdrop-blur-md rounded-[50px] shadow-[0_0_40px_rgba(225,29,72,0.3)] flex items-center justify-center">
                 <div className="w-[140px] h-[60px] bg-rose-500/20 blur-xl rounded-full" />
              </div>
              
              {/* Uçan Rozetler (Görseldeki N logoları vb.) */}
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} 
                className="absolute -top-10 -left-10 w-10 h-10 border border-gray-400/50 rounded-full flex items-center justify-center bg-[#1a1b23]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <span className="font-bold text-gray-200">N</span>
              </motion.div>
            </div>
          </motion.div>

          {/* 5. GPU RAF SİSTEMİ (Sol Alt - İçi boş, sadece çerçeve tarzı) */}
          <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible"
            className="absolute left-[200px] top-[480px] -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {/* İzometrik Açı */}
            <div className="flex gap-[6px] -rotate-[30deg] skew-x-[35deg]">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="relative w-[50px] h-[180px] bg-[#15161c]/60 backdrop-blur-md border-[1.5px] border-gray-400/50 rounded-sm flex flex-col justify-between p-2 shadow-[-10px_10px_20px_rgba(0,0,0,0.5)]">
                  
                  {/* Kart Başı (Üst Kısım) */}
                  <div className="w-full h-4 border border-gray-500/50 rounded-[1px] flex justify-center items-center">
                     <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  </div>

                  {/* Fanlar (Ortada ve Altta) */}
                  <div className="flex flex-col gap-3 mb-2">
                    <div className="w-8 h-8 mx-auto rounded-full border-[1.5px] border-gray-400/50 flex items-center justify-center bg-transparent">
                      <Cpu className="w-4 h-4 text-gray-400/70" strokeWidth={1.5} />
                    </div>
                    <div className="w-8 h-8 mx-auto rounded-full border-[1.5px] border-gray-400/50 flex items-center justify-center bg-transparent">
                      <Cpu className="w-4 h-4 text-gray-400/70" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}