import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import {
  createPage,
  createChoice,
  updatePage,
  deletePage,
} from "../../api/editorAPI";
import { updateStory } from "../../api/storyAPI";

import "../../css/Editor.css";

const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value]);

  return debounced;
};

export default function StoryEditor() {
  const { storyId } = useParams();

  const [status, setStatus] = useState("draft");

  const [pages, setPages] = useState([]);
  const [text, setText] = useState("");

  const nav = useNavigate();

  /* ======================
       TOGGLE HANDLER  
  ====================== */

  const toggleStatus = async () => {
    const newStatus = status === "draft" ? "published" : "draft";

    await updateStory(storyId, {
      status: newStatus,
    });

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

    setPages([...pages, { ...page, choices: [] }]);
    setText("");
  };

  /* ======================
     DELETE
  ====================== */
  const removePage = async (id) => {
    await deletePage(id);
    setPages(pages.filter((p) => p.id !== id));
  };

  /* ======================
     AUTO SAVE
  ====================== */
  const updateLocal = (id, field, value) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  pages.forEach((p) => {
    const debouncedText = useDebounce(p.text);
    const debouncedEnding = useDebounce(p.is_ending);

    useEffect(() => {
      updatePage(p.id, {
        text: debouncedText,
        is_ending: debouncedEnding,
      });
    }, [debouncedText, debouncedEnding]);
  });

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

      <div className="levelsGrid">
        {pages.map((p, index) => (
          <div key={p.id} className="editorCard">
            <div className="editorHeader">
              <h3>Page {index + 1}</h3>
              <button onClick={() => removePage(p.id)}>✕</button>
            </div>

            <textarea
              value={p.text}
              onChange={(e) => updateLocal(p.id, "text", e.target.value)}
            />

            <label className="endingToggle">
              <input
                type="checkbox"
                checked={p.is_ending}
                onChange={(e) =>
                  updateLocal(p.id, "is_ending", e.target.checked)
                }
              />
              ending page
            </label>

            {!p.is_ending && (
              <div className="choicesRow">
                {pages
                  .filter((x) => x.id !== p.id)
                  .map((target, i) => (
                    <button
                      key={target.id}
                      onClick={() => addChoice(p.id, target.id)}
                    >
                      → Page {i + 1}
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
