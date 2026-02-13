import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MagicBallScene from "./three/MagicBallScene";
import "./App.css";

export default function App() {
  return (
    <div className="levelsPage">
      {/* 3D BACKGROUND */}
      <MagicBallScene />

      {/* UI OVERLAY */}
      <div className="levelsContent">
        <h1 className="levelsTitle">are you ready?</h1>
        {/* 
        <Link to="/levels">
          <motion.button
            className="playButton"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            enter
          </motion.button>
        </Link> */}
      </div>
    </div>
  );
}
