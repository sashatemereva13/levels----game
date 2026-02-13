import { Text, Float } from "@react-three/drei";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterText() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={2} floatIntensity={1.5} rotationIntensity={0.2}>
      <Text
        position={[0, -0.5, 1]} // below the ball
        fontSize={0.35}
        letterSpacing={0.12}
        font="/fontsCSS/Canobis-Regular.otf"
        anchorX="center"
        anchorY="middle"
        color={hovered ? "#ffffff" : "#bca7ff"}
        onClick={() => navigate("/levels")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        enter
        <meshStandardMaterial
          emissive={hovered ? "#a78bfa" : "#5b4abf"}
          emissiveIntensity={hovered ? 2 : 0.7}
          roughness={0.3}
        />
      </Text>
    </Float>
  );
}
