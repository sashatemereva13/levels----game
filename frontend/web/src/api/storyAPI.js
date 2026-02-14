const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = (path, options = {}) =>
  fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }).then((r) => r.json());

export const getMyStories = () => api("/stories/mine/");

export const createStory = (data) =>
  api("/stories/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const publishStory = (id) =>
  api(`/stories/${id}/publish/`, { method: "PUT" });

export const deleteStory = (id) =>
  api(`/stories/${id}/`, {
    method: "DELETE",
  });

export const updateStory = (id, data) =>
  api(`/stories/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const getStory = (id) => api(`/stories/${id}/detail/`);
