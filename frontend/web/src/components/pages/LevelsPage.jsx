import { useEffect, useState } from "react";
import { getStories } from "../../api/gameplayAPI";
import LevelCard from "./LevelCard";
import "../../css/LevelsPage.css";
import VIBRATION_LEVELS from "../../utils/LevelsList";
import RevealOnScroll from "../../utils/RevealOnScroll";

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

  const grouped = VIBRATION_LEVELS.map((level) => ({
    level,
    stories: stories.filter((s) => s.level === level),
  }));

  return (
    <div className="levelsPage">
      <h1 className="levelsTitle">vibration levels</h1>

      <div className="levelsWrapper">
        {grouped.map((section) => (
          <RevealOnScroll key={section.level}>
            <div key={section.level} className="levelSection">
              <h2 className="levelName">{section.level.replace("_", " ")}</h2>

              {section.stories.length > 0 ? (
                <div className="levelsGrid">
                  {section.stories.map((story) => (
                    <LevelCard key={story.id} story={story} />
                  ))}
                </div>
              ) : (
                <div className="levelEmpty">no stories yet ✨</div>
              )}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
