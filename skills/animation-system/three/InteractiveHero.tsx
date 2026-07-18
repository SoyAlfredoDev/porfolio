"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";
import { useMousePosition } from "../hooks/useMousePosition";
import { cappedDpr } from "../utils/raf";
import { useMotion } from "@/context/MotionProvider";

function Orb() {
  const mesh = useRef<Mesh>(null);
  const mouse = useMousePosition(true);
  const { style } = useMotion();

  const color = useMemo(() => {
    if (style === "christmas") return "#C41E3A";
    if (style === "retro") return "#fbbf24";
    return "#01c676";
  }, [style]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.22;
    mesh.current.position.x += (mouse.x * 0.45 - mesh.current.position.x) * 0.06;
    mesh.current.position.y += (-mouse.y * 0.3 - mesh.current.position.y) * 0.06;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.25}
          metalness={0.35}
          distort={0.28}
          speed={1.6}
        />
      </mesh>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
    </Float>
  );
}

type Props = { className?: string };

/**
 * R3F Hero accent — lazy-load from outside with ssr:false.
 * Paints after HTML; pause via parent unmount / not rendering when out of view.
 */
export function InteractiveHero({ className }: Props) {
  const { isMobile } = useMotion();
  const dpr = cappedDpr(isMobile ? 1 : 1.5);

  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Orb />
      </Canvas>
    </div>
  );
}

export default InteractiveHero;
