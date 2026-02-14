import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MagicBall() {
  const ballRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // slow rotation
    ballRef.current.rotation.y = t * 0.25;

    ballRef.current.position.y = Math.sin(t * 0.7) * 0.15;

    // breathing scale
    const breathe = 1 + Math.sin(t * 1.2) * 0.04;
    ballRef.current.scale.set(breathe, breathe, breathe);
  });

  return (
    <group position={[2, 0, -2]} ref={ballRef}>
      {/* inner glow light */}
      <pointLight intensity={2} distance={3} color="#b98cff" />

      {/* main sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#ce4848"
          roughness={0.05}
          metalness={0.1}
          transmission={1} // glass
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.4}
          emissive="#7c5cff"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* subtle outer aura */}
      <mesh scale={1.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
