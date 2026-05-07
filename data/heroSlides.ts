export type IllustrationVariant = "orchestrator" | "gpu-mesh" | "inference";

export type HeroSlide = {
  id: string;
  headline: { line1: string; line2: string };
  subheadline: string;
  illustration: IllustrationVariant;
  ctaLabel: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "orchestrator",
    headline: { line1: "SwarmOne AI NeoOrchestrator", line2: "for Evaluation." },
    subheadline:
      "Not an evolution of vLLM or Ray. A new class entirely. Neo AI orchestration built for heterogeneous silicon, SLO-driven autoscaling, and lower cost per token.",
    illustration: "orchestrator",
    ctaLabel: "get a demo",
  },
  {
    id: "gpu-mesh",
    headline: { line1: "SwarmOne GPU Mesh", line2: "for Training." },
    subheadline:
      "Orchestrate thousands of GPUs across heterogeneous clusters. Dynamic partitioning, fault-tolerant scheduling, and real-time SLO enforcement.",
    illustration: "gpu-mesh",
    ctaLabel: "see the mesh",
  },
  {
    id: "inference",
    headline: { line1: "SwarmOne Inference Engine", line2: "for Production." },
    subheadline:
      "Serve any model on any silicon at maximum throughput. Autoscale from zero, pay per token, and hit your latency SLOs consistently.",
    illustration: "inference",
    ctaLabel: "start serving",
  },
];
