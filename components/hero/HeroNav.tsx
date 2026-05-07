"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { KbdButton } from "./KbdButton";

const NAV_ITEMS = ["Resources", "Case Studies", "Platform", "Product", "Solutions", "Pricing"];

interface HeroNavProps {
  onContactClick?: () => void;
}

export function HeroNav({ onContactClick }: HeroNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 h-14 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[#0A0E1A]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-7 h-7 rounded-md border border-white/20 flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <circle cx={10} cy={10} r={3.5} stroke="white" strokeWidth={1.2} />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={10 + 4 * Math.cos(rad)} y1={10 + 4 * Math.sin(rad)}
                  x2={10 + 8 * Math.cos(rad)} y2={10 + 8 * Math.sin(rad)}
                  stroke="white" strokeWidth={1} strokeOpacity={0.7}
                />
              );
            })}
          </svg>
        </div>
        <span className="text-white text-sm font-medium tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
          SwarmOne
        </span>
      </div>

      {/* Center nav items */}
      <ul className="hidden lg:flex items-center gap-0.5">
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <motion.button
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-gray-400 hover:text-white text-sm transition-colors cursor-pointer group"
              whileHover="hover"
            >
              <span className="relative">
                {item}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px bg-white/40 block"
                  variants={{ hover: { width: "100%" }, initial: { width: "0%" } }}
                  initial="initial"
                  transition={{ duration: 0.2 }}
                  style={{ width: "0%" }}
                />
              </span>
              {["Resources", "Platform", "Product", "Solutions"].includes(item) && (
                <ChevronDown className="w-3 h-3 opacity-50" />
              )}
            </motion.button>
          </li>
        ))}
      </ul>

      {/* Right CTA */}
      <KbdButton
        onClick={onContactClick}
        kbd="R"
        label="contact us"
        variant="ghost"
      />
    </motion.nav>
  );
}
