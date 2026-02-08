import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import AuraMaterial from "./AuraMaterial";

function AuraPlane() {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.uTime = clock.elapsedTime;
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <auraMaterial ref={ref} transparent />
    </mesh>
  );
}

export default function BackgroundFX() {
  return (
    <Canvas
          style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
      className="bgCanvas"
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: false }}
    >
      <AuraPlane />
    </Canvas>
  );
}
