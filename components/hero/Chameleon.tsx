"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CHAMELEON_SHAPES } from "@/lib/chameleon-shape";

export interface Tilt {
  x: number;
  y: number;
}

interface ChameleonProps {
  /** Normalized pointer / device tilt in [-1, 1], updated outside the canvas. */
  tilt: MutableRefObject<Tilt>;
  scale?: number;
  /** Vertical placement in world units. */
  offsetY?: number;
  /** Lower the geometry detail on constrained devices. */
  quality?: "high" | "low";
}

/** Build the extruded geometry once from the traced logo shapes. */
function useChameleonGeometry(quality: "high" | "low") {
  return useMemo(() => {
    const shapes = CHAMELEON_SHAPES.map((s) => {
      const shape = new THREE.Shape(
        s.outline.map(([x, y]) => new THREE.Vector2(x, y)),
      );
      for (const hole of s.holes) {
        shape.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))));
      }
      return shape;
    });

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: quality === "high" ? 3 : 1,
      curveSegments: quality === "high" ? 4 : 2,
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }, [quality]);
}

/**
 * The floating, lacquered 3D chameleon — the centrepiece of the hero.
 * Idle bob + a directed tilt that eases toward pointer / device orientation,
 * plus a one-shot entrance (scale + settle). One mesh, one material: cheap.
 */
export function Chameleon({ tilt, scale = 1.8, offsetY = 0, quality = "high" }: ChameleonProps) {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const geometry = useChameleonGeometry(quality);
  const start = useRef<number | null>(null);

  useFrame((state, delta) => {
    const g = group.current;
    const m = mesh.current;
    if (!g || !m) return;
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const since = t - start.current;

    // Entrance: ease scale 0.86 -> 1 and fade in over ~1.1s.
    const intro = Math.min(since / 1.1, 1);
    const eased = 1 - Math.pow(1 - intro, 3); // easeOutCubic
    const s = scale * (0.86 + 0.14 * eased);
    g.scale.setScalar(s);
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.opacity = eased;

    // Idle float.
    g.position.y = offsetY + Math.sin(t * 0.7) * 0.06;

    // Directed tilt eased toward pointer / gyro, with a faint base 3/4 view
    // and a slow idle sway so it never feels frozen.
    const k = 1 - Math.pow(0.0015, delta);
    const targetY = tilt.current.x * 0.5 + Math.sin(t * 0.25) * 0.06;
    const targetX = -tilt.current.y * 0.32 + Math.cos(t * 0.2) * 0.04;
    m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, targetY, k) * (0.4 + 0.6 * eased);
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, targetX, k);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, tilt.current.x * 0.04, k);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#971b1b"
          roughness={0.32}
          metalness={0.05}
          emissive="#3a0a0a"
          emissiveIntensity={0.18}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
