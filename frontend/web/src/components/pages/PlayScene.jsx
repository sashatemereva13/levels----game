import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { startStory, choose } from "../../api/gameplayAPI";
import "../../css/PlayScene.css";
import ProgressBar from "./ProgressBar";
import TypewriterText from "../../utils/TypeWriter";

export default function PlayScene() {
  const { storyId } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [history, setHistory] = useState([]);

  const progress = Math.min((history.length / 15) * 100, 100);

  useEffect(() => {
    startStory(storyId).then((first) => {
      setPage(first);
      setHistory([first]);
    });
  }, [storyId]);

  const goNext = async (nextId) => {
    const next = await choose(storyId, nextId);
    setHistory((h) => [...h, next]);
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setHistory((h) => {
      if (h.length <= 1) return h;
      const newHist = h.slice(0, -1);
      setPage(newHist[newHist.length - 1]);
      return newHist;
    });
  };

  const restart = () => {
    startStory(storyId).then((first) => {
      setPage(first);
      setHistory([first]);
    });
  };

  if (!page)
    return <div className="loading-glow">tuning into frequency...</div>;

  return (
    <div className="playPage">
      {/* top nav */}
      <div className="playNav">
        <button onClick={goBack} disabled={history.length <= 1}>
          ← Back
        </button>
        <button onClick={restart}>Restart</button>
        <button onClick={() => navigate("/levels")}>Exit</button>
      </div>
      <ProgressBar value={progress} />

      {/* story text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page.id}
          className="storyText"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45 }}
        >
          <TypewriterText text={page.text} speed={40} />
        </motion.div>
      </AnimatePresence>

      {/* choices */}
      <div className="choicesGrid">
        {page.choices.map((c) => (
          <motion.button
            key={c.id}
            className="choiceCard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => goNext(c.next_page_id)}
          >
            {c.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
