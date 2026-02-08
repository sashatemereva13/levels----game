import LevelsText from "./LevelsText";
import LevelsDesign from "./LevelsDesign";
import { Canvas } from "@react-three/fiber";

const LevelsFullPage = () => {
  return (
    <div className="noScroll">
      <Canvas camera={{ fov: 35, near: 0.1, far: 200, position: [5, 10, 5] }}>
        <LevelsDesign />
      </Canvas>
      <LevelsText />
    </div>
  );
};

export default LevelsFullPage;
