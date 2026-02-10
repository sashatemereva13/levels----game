const BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(
  /\/$/,
  "",
);

const api = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json();
};

export const getStories = () => api("/stories");
export const startStory = (id) => api(`/gameplay/${id}/start`);

export const getCurrentPage = (id) => api(`/gameplay/${id}/current`);

export const choose = (storyId, nextPageId) =>
  api(`/gameplay/${storyId}/choice`, {
    method: "POST",
    body: JSON.stringify({ next_page_id: nextPageId }),
  });
