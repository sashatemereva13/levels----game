import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getStories } from "./api/gameplay";
import "./App.css";

export default function App() {
  return (
    <div className="levelsPage">
      <h1 className="levelsTitle">vibration levels</h1>
      <Link to="/levels" className="playButton">
        <motion.div
          className="playButtonInner"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          levels
        </motion.div>
      </Link>
    </div>
  );
}
