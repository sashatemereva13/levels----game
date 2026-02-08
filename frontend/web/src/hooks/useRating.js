import { useEffect, useState } from "react";
import { rateStory, getRatingStats, getComments } from "../api/ratingApi";

export default function useRating(storyId) {
  const [stats, setStats] = useState(null);
  const [comments, setComments] = useState([]);

  async function refresh() {
    const s = await getRatingStats(storyId);
    const c = await getComments(storyId);

    setStats(s);
    setComments(c);
  }

  async function submit(score, comment) {
    await rateStory(storyId, score, comment);
    await refresh();
  }

  useEffect(() => {
    refresh();
  }, [storyId]);

  return {
    stats,
    comments,
    submit,
  };
}
