"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { KbdButton } from "./KbdButton";
import { SlideProgress } from "./SlideProgress";
import { HeroSlide } from "../../data/heroSlides";

interface HeroContentProps {
  slide: HeroSlide;
  activeIndex: number;
  total: number;
  duration: number;
  onDemoClick?: () => void;
  onSelectSlide?: (i: number) => void;
}

export function HeroContent({
  slide,
  activeIndex,
  total,
  duration,
  onDemoClick,
  onSelectSlide,
}: HeroContentProps) {
  return (
    <div className="flex flex-col items-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.06] tracking-tight text-white mb-5"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {slide.headline.line1}
            <br />
            {slide.headline.line2}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-md mb-8"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {slide.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-4"
          >
            <KbdButton
              onClick={onDemoClick}
              kbd="G"
              label={slide.ctaLabel}
              variant="primary"
            />

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center bg-white/3">
                <Shield className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-gray-500" style={{ fontFamily: "var(--font-geist-sans)" }}>
                SOC 2 secured, smart, reliable
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Slide progress */}
      <SlideProgress
        activeIndex={activeIndex}
        total={total}
        duration={duration}
        onSelect={onSelectSlide}
      />
    </div>
  );
}
