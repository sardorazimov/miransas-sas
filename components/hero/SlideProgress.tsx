"use client";
import { motion } from "framer-motion";

interface SlideProgressProps {
  activeIndex: number;
  total: number;
  duration?: number;
  onSelect?: (i: number) => void;
}

export function SlideProgress({
  activeIndex,
  total,
  duration = 8,
  onSelect,
}: SlideProgressProps) {
  return (
    <div className="flex items-center gap-2 mt-6 w-full max-w-xs">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect?.(i)}
          className="relative h-px flex-1 rounded-full overflow-hidden bg-white/10 cursor-pointer group"
          aria-label={`Slide ${i + 1}`}
        >
          {i < activeIndex && (
            <div className="absolute inset-0 bg-white/40 rounded-full" />
          )}
          {i === activeIndex && (
            <motion.div
              key={activeIndex}
              className="absolute inset-y-0 left-0 bg-white/50 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration, ease: "linear" }}
            />
          )}
          <div className="absolute inset-0 group-hover:bg-white/15 rounded-full transition-colors" />
        </button>
      ))}
    </div>
  );
}
