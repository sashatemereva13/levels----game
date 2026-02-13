import { useEffect, useState } from "react";
import { updatePage } from "../../api/editorAPI";

/* ======================
   SMALL DEBOUNCE HOOK
====================== */
const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
};

/* ======================
   PAGE CARD COMPONENT
====================== */

export default function PageCard({
  page,
  pages,
  updateLocal,
  removePage,
  addChoice,
  index,
}) {
  const debouncedText = useDebounce(page.text);
  const debouncedEnding = useDebounce(page.is_ending);

  /* ======================
     AUTO SAVE (per page)
  ====================== */

  useEffect(() => {
    updatePage(page.id, {
      text: debouncedText,
      is_ending: debouncedEnding,
    });
  }, [debouncedText, debouncedEnding, page.id]);

  /* ======================
     UI
  ====================== */

  return (
    <div className="editorCard">
      <div className="editorHeader">
        <h3>Page {index + 1}</h3>
        <button onClick={() => removePage(page.id)}>✕</button>
      </div>

      <textarea
        value={page.text}
        onChange={(e) => updateLocal(page.id, "text", e.target.value)}
      />

      <label className="endingToggle">
        <input
          type="checkbox"
          checked={page.is_ending}
          onChange={(e) => updateLocal(page.id, "is_ending", e.target.checked)}
        />
        ending page
      </label>

      {!page.is_ending && (
        <div className="choicesRow">
          {pages
            .filter((x) => x.id !== page.id)
            .map((target, i) => (
              <button
                key={target.id}
                onClick={() => addChoice(page.id, target.id)}
              >
                → Page {i + 1}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
