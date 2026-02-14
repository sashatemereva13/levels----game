import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Environment } from "@react-three/drei";

export default function MagicBall2() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // slow elegant rotation
    groupRef.current.rotation.y = t * 0.18;

    // subtle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.1;

    // breathing
    const breathe = 1 + Math.sin(t * 1.2) * 0.025;
    groupRef.current.scale.set(breathe, breathe, breathe);
  });

  return (
    <>
      <Environment preset="apartment" />
      <group position={[-2, 0, 1]} ref={groupRef}>
        <mesh>
          <sphereGeometry args={[1, 128, 128]} />

          <MeshDistortMaterial
            color="#2e004f" // deep violet base
            metalness={1}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0}
            distort={0.4}
            speed={1.8}
            emissive="#2b0057"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </>
  );
}
