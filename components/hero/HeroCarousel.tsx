"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { heroSlides } from "../../data/heroSlides";
import { HeroNav } from "./HeroNav";
import { HeroContent } from "./HeroContent";
import { HeroIllustration } from "./HeroIllustration";
import { useKeyboardShortcut } from "../../hooks/useKeyboardShortcut";
import { useAutoAdvance } from "../../hooks/useAutoAdvance";

const SLIDE_DURATION = 8;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((p) => (p + 1) % heroSlides.length),
    [],
  );
  const prev = useCallback(
    () => setActive((p) => (p - 1 + heroSlides.length) % heroSlides.length),
    [],
  );

  useAutoAdvance(next, SLIDE_DURATION * 1000, paused);

  useKeyboardShortcut("ArrowRight", next);
  useKeyboardShortcut("ArrowLeft", prev);
  useKeyboardShortcut("g", () => console.log("demo cta"));
  useKeyboardShortcut("r", () => console.log("contact cta"));

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Navigation */}
      <HeroNav onContactClick={() => console.log("contact")} />

      {/* Main content grid */}
      <main className="flex-1 flex items-center max-w-[1500px] mx-auto w-full px-8 lg:px-16 py-12 lg:py-0">
        <div className="w-full grid lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* Left: content (5/12) */}
          <div className="lg:col-span-5 flex flex-col items-start z-10">
            <HeroContent
              slide={heroSlides[active]}
              activeIndex={active}
              total={heroSlides.length}
              duration={SLIDE_DURATION}
              onDemoClick={() => console.log("demo")}
              onSelectSlide={setActive}
            />
          </div>

          {/* Right: illustration (7/12) */}
          <div className="lg:col-span-7 relative w-full aspect-[8/7] lg:aspect-auto lg:h-[calc(100vh-3.5rem)] max-h-[700px] select-none pointer-events-none">
            <HeroIllustration variant={heroSlides[active].illustration} />
          </div>
        </div>
      </main>

      {/* Side carousel arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={prev}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={next}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Bottom-right floating pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 right-8 lg:right-16 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/4 backdrop-blur-md text-gray-300 text-sm cursor-pointer hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          <Sparkles className="w-3.5 h-3.5 opacity-70" />
          <span>Calculate your current losses</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
