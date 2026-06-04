"use client";

import { useState, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Chameleon, type Tilt } from "./Chameleon";

/**
 * White studio for the floating chameleon. A soft white key light gives the
 * bevels their highlights; warm bordeaux fills enrich the red. Quality + DPR
 * adapt down automatically under load so it holds 60fps on phones.
 */
export default function HeroCanvas({
  tilt,
  isMobile,
}: {
  tilt: MutableRefObject<Tilt>;
  isMobile: boolean;
}) {
  const [quality, setQuality] = useState<"high" | "low">(isMobile ? "low" : "high");
  const maxDpr = isMobile ? 1.5 : 1.8;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, maxDpr]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 40 }}
    >
      <PerformanceMonitor onDecline={() => setQuality("low")}>
        {/* Bright base so the white scene stays airy */}
        <ambientLight intensity={0.85} />
        {/* Key light, upper-left — shapes the bevels */}
        <directionalLight position={[-4, 5, 5]} intensity={1.35} />
        {/* Warm bordeaux fills for depth in the red */}
        <directionalLight position={[5, 1, 2]} intensity={0.5} color="#e2a6a6" />
        <pointLight position={[-3, -2, 4]} intensity={0.55} color="#b83232" />

        <Chameleon
          tilt={tilt}
          scale={isMobile ? 1.2 : 1.55}
          offsetY={isMobile ? 0.05 : 0.12}
          quality={quality}
        />
      </PerformanceMonitor>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
