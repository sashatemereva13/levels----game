import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  createPage,
  createChoice,
  deletePage,
  getStoryPages,
} from "../../api/editorAPI";

import { updateStory, getStory, deleteStory } from "../../api/storyAPI";

import VIBRATION_LEVELS from "../../utils/LevelsList";
import PageCard from "./PageCard";

import "../../css/Editor.css";

export default function StoryEditor() {
  const { storyId } = useParams();
  const nav = useNavigate();

  // story meta
  const [status, setStatus] = useState("draft");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");
  const [level, setLevel] = useState("");

  // pages
  const [pages, setPages] = useState([]);
  const [text, setText] = useState("");

  /* ======================
     LOAD STORY + PAGES
  ====================== */

  useEffect(() => {
    const loadAll = async () => {
      setPages([]);
      const story = await getStory(storyId);

      setStatus(story.status || "draft");
      setTitle(story.title || "");
      setDescription(story.description || "");
      setDuration(story.duration_minutes ?? "");
      setGenre(story.genre || "");
      setCover(story.cover_url || "");
      setLevel(story.level || "");

      const pagesData = await getStoryPages(storyId);
      setPages(pagesData);
    };

    loadAll();
  }, [storyId]);

  /* ======================
     TOGGLE STATUS
  ====================== */

  const toggleStatus = async () => {
    const newStatus = status === "draft" ? "published" : "draft";
    await updateStory(storyId, { status: newStatus });
    setStatus(newStatus);
  };

  /* ======================
     SAVE STORY META
  ====================== */

  const saveStory = async () => {
    await updateStory(storyId, {
      title,
      description,
      duration_minutes: duration ? Number(duration) : null,
      genre,
      cover_url: cover,
      level,
    });
  };

  /* ======================
     DELETE STORY
  ====================== */

  const removeStory = async () => {
    await deleteStory(storyId);
    nav("/dashboard");
  };

  /* ======================
     ADD PAGE
  ====================== */
  const addPage = async () => {
    if (!text.trim()) return;

    const page = await createPage(storyId, {
      text,
      is_ending: false,
    });

    const previous = pages[pages.length - 1];

    setPages((prev) => [...prev, { ...page, choices: [] }]);

    if (previous) {
      await addChoice(previous.id, page.id);
    }

    setText("");
  };

  /* ======================
     DELETE PAGE
  ====================== */

  const removePage = async (id) => {
    await deletePage(id);
    setPages((prev) => prev.filter((p) => p.id !== id));

    // also remove any choices pointing to deleted page (local only)
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        choices: (p.choices || []).filter((c) => c.next_page_id !== id),
      })),
    );
  };

  /* ======================
     LOCAL UPDATE
  ====================== */

  const updateLocal = (id, field, value) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  /* ======================
     ADD CHOICE
  ====================== */

  const addChoice = async (pageId, nextPageId) => {
    const choice = await createChoice(pageId, {
      text: "continue",
      next_page_id: nextPageId,
    });

    setPages((prev) =>
      prev.map((p) =>
        p.id === pageId ? { ...p, choices: [...(p.choices || []), choice] } : p,
      ),
    );
  };

  /* ======================
     UI
  ====================== */

  return (
    <div className="levelsPage">
      {/* top bar */}
      <div className="editorTopBar">
        <h1>story editor</h1>

        <div className="editorActions">
          <button onClick={() => nav(`/play/${storyId}`)}>▶ preview</button>
          <button onClick={() => nav("/dashboard")}>← dashboard</button>
          <button className="danger" onClick={removeStory}>
            delete story
          </button>
        </div>

        <div className="editorStatus">
          <span>Status:</span>
          <button onClick={toggleStatus}>
            {status === "draft" ? "🟡 Draft" : "🟢 Published"}
          </button>
        </div>
      </div>

      {/* story meta */}
      <div className="editorMeta">
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
              {l.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <input
          placeholder="cover image url"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <button onClick={saveStory}>save story</button>
      </div>

      {/* create new page */}
      <div className="editorNewPage">
        <textarea
          placeholder="new page text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addPage} disabled={!text.trim()}>
          add page
        </button>
      </div>

      {/* pages grid */}
      <div className="levelsGrid">
        {pages.map((p, index) => (
          <PageCard
            key={p.id}
            page={p}
            pages={pages}
            index={index}
            updateLocal={updateLocal}
            removePage={removePage}
            addChoice={addChoice}
          />
        ))}
      </div>
    </div>
  );
}
