import { Canvas } from "@react-three/fiber";
import MagicBall from "./MagicBall";
import EnterText from "./EnterText";
import MagicBall2 from "./MagicBall2";

export default function MagicBallScene() {
  return (
    <div className="canvasWrapper">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <EnterText />
        <MagicBall2 />
        <MagicBall />
      </Canvas>
    </div>
  );
}
