import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyStories,
  createStory,
  deleteStory,
  publishStory,
} from "../../api/storyAPI";
import { getPlayStats, getRatingStats } from "../../api/storyStatsAPI";
import VIBRATION_LEVELS from "../../utils/LevelsList";

import "../../css/Dashboard.css";

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");
  const [level, setLevel] = useState("");

  const nav = useNavigate();

  const load = async () => {
    const data = await getMyStories();

    const withStats = await Promise.all(
      data.map(async (s) => {
        const plays = await getPlayStats(s.id);
        const ratings = await getRatingStats(s.id);

        return {
          ...s,
          plays: plays.total_plays,
          ratingAvg: ratings.average,
          ratingCount: ratings.count,
        };
      }),
    );

    setStories(withStats);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!title.trim() || !level) return;

    const story = await createStory({
      title,
      description,
      duration_minutes: duration,
      genre,
      level,
      cover_url: cover,
    });
    setTitle("");
    setDescription("");
    setDuration("");
    setGenre("");
    setLevel("");
    setCover("");
    nav(`/dashboard/edit/${story.id}`);
  };

  const remove = async (id) => {
    await deleteStory(id);
    load();
  };

  const publish = async (id) => {
    await publishStory(id);
    load();
  };

  return (
    <div className="dashboardPage">
      {/* ================= HEADER ================= */}
      <div className="dashboardHeader">
        <h1>my stories</h1>
      </div>

      {/* ================= CREATE ================= */}
      <div className="dashboardCreate">
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="short description…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          min="1"
          step="1"
          placeholder="length (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          placeholder="genre (dreamy / horror / calm)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="" disabled>
            choose the level of vibration ✨
          </option>

          {[...VIBRATION_LEVELS].reverse().map((l) => (
            <option key={l} value={l}>
              {l.replace("_", " ")}
            </option>
          ))}
        </select>

        <input
          placeholder="cover image url"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <button onClick={create}>+ create</button>
      </div>

      {/* ================= EMPTY ================= */}
      {stories.length === 0 && (
        <div className="dashboardEmpty">create your first story ✨</div>
      )}

      {/* ================= GRID ================= */}
      <div className="dashboardGrid">
        {stories.map((s) => (
          <div key={s.id} className="storyCard">
            {/* cover */}
            <div
              className="storyCover"
              style={{
                backgroundImage: `url(${s.cover_url || "/placeholder.jpg"})`,
              }}
            />

            {/* content */}
            <div className="storyBody">
              <div className="storyHeader">
                <h3>{s.title}</h3>

                <span
                  className={
                    s.status === "published" ? "badgePublished" : "badgeDraft"
                  }
                >
                  {s.status}
                </span>
              </div>

              <p className="storyMeta">
                {s.genre || "no genre"} · {s.duration_minutes} min
              </p>

              <div className="storyStats">
                <span>👁 {s.plays || 0}</span>
                <span>
                  ⭐ {s.ratingAvg?.toFixed?.(1) || 0}
                  {s.ratingCount ? ` (${s.ratingCount})` : ""}
                </span>
              </div>

              <div className="storyActions">
                <button onClick={() => nav(`/dashboard/edit/${s.id}`)}>
                  edit
                </button>

                <button onClick={() => nav(`/play/${s.id}`)}>preview</button>

                {s.status === "draft" && (
                  <button onClick={() => publish(s.id)}>publish</button>
                )}
                <button onClick={() => remove(s.id)} className="danger">
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
