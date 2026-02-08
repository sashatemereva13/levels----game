import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LevelCard({ story }) {
  return (
    <Link to={`/play/${story.id}`} className="levelLink">
      <motion.div
        className="levelCard"
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="levelLabel">{story.title}</span>
      </motion.div>
    </Link>
  );
}
