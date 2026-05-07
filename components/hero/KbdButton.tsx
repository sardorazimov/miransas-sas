"use client";
import { motion } from "framer-motion";

interface KbdButtonProps {
  onClick?: () => void;
  kbd: string;
  prefix?: string;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export function KbdButton({
  onClick,
  kbd,
  prefix = "Press",
  label,
  variant = "primary",
  className = "",
}: KbdButtonProps) {
  if (variant === "ghost") {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-400 text-sm hover:text-white hover:border-white/20 transition-colors cursor-pointer ${className}`}
      >
        {prefix && <span>{prefix}</span>}
        <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 text-[10px] font-mono leading-none">
          {kbd}
        </kbd>
        <span>to {label}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(255,255,255,0.18)" }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium cursor-pointer ${className}`}
    >
      {prefix && <span>{prefix}</span>}
      <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-gray-100 text-gray-700 text-[10px] font-mono leading-none">
        {kbd}
      </kbd>
      <span>to {label}</span>
    </motion.button>
  );
}
