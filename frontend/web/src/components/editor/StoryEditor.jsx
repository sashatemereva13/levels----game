import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createPage, createChoice, deletePage } from "../../api/editorAPI";
import { updateStory } from "../../api/storyAPI";

import PageCard from "./PageCard";

import "../../css/Editor.css";

export default function StoryEditor() {
  const { storyId } = useParams();
  const nav = useNavigate();

  const [status, setStatus] = useState("draft");
  const [pages, setPages] = useState([]);
  const [text, setText] = useState("");

  /* ======================
     TOGGLE STATUS
  ====================== */

  const toggleStatus = async () => {
    const newStatus = status === "draft" ? "published" : "draft";

    await updateStory(storyId, { status: newStatus });
    setStatus(newStatus);
  };

  /* ======================
     ADD PAGE
  ====================== */

  const addPage = async () => {
    const page = await createPage(storyId, {
      text,
      is_ending: false,
    });

    setPages((prev) => [...prev, { ...page, choices: [] }]);
    setText("");
  };

  /* ======================
     DELETE PAGE
  ====================== */

  const removePage = async (id) => {
    await deletePage(id);
    setPages((prev) => prev.filter((p) => p.id !== id));
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
        p.id === pageId ? { ...p, choices: [...p.choices, choice] } : p,
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
        </div>

        <div className="editorStatus">
          <span>Status:</span>
          <button onClick={toggleStatus}>
            {status === "draft" ? "🟡 Draft" : "🟢 Published"}
          </button>
        </div>
      </div>

      {/* create new page */}
      <div style={{ marginBottom: 40 }}>
        <textarea
          placeholder="new page text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addPage}>add page</button>
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
