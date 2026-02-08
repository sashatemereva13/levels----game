import { motion } from "framer-motion";
import "../../css/ProgressBar.css";

export default function ProgressBar({ value }) {
  return (
    <div className="progressWrapper">
      <motion.div
        className="progressFill"
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      />
    </div>
  );
}
