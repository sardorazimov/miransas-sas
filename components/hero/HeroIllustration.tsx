"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IllustrationVariant } from "../../data/heroSlides";
import { OrchestratorScene } from "./illustrations/OrchestratorScene";
import { GpuMeshScene } from "./illustrations/GpuMeshScene";
import { InferenceScene } from "./illustrations/InferenceScene";

interface HeroIllustrationProps {
  variant: IllustrationVariant;
}

export function HeroIllustration({ variant }: HeroIllustrationProps) {
  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {variant === "orchestrator" && <OrchestratorScene />}
          {variant === "gpu-mesh" && <GpuMeshScene />}
          {variant === "inference" && <InferenceScene />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
