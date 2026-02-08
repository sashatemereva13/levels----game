const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = (path, options = {}) =>
  fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  }).then((r) => r.json());

export const getStories = () => api("/stories/");

export const startStory = (id) => api(`/gameplay/start/${id}/`);

export const getCurrentPage = (id) => api(`/gameplay/current/${id}/`);

export const choose = (storyId, nextPageId) =>
  api(`/gameplay/choose/`, {
    method: "POST",
    body: JSON.stringify({
      story_id: storyId,
      next_page_id: nextPageId,
    }),
  });
