import { useEffect, useState } from "react";
import { getStories } from "../../api/gameplayAPI";
import LevelCard from "./LevelCard";
import "../../css/LevelsPage.css";

export default function LevelsPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getStories({ signal: controller.signal })
      .then(setStories)
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load levels. Please try again later.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) return <div className="loading">Loading levels…</div>;
  if (error) return <div className="loading">{error}</div>;
  if (!stories.length) return <div className="loading">No levels yet ✨</div>;

  return (
    <div className="levelsPage">
      <h1 className="levelsTitle">vibration levels</h1>

      <div className="levelsGrid">
        {stories.map((story) => (
          <LevelCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
