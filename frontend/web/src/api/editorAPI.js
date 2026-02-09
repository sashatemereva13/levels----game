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

export const createPage = (storyId, data) =>
  api(`/stories/${storyId}/pages/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const createChoice = (pageId, data) =>
  api(`/pages/${pageId}/choices/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getPage = (pageId) => api(`/pages/${pageId}/`);

export const updatePage = (pageId, data) =>
  api(`/pages/${pageId}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deletePage = (pageId) =>
  api(`/pages/${pageId}/`, {
    method: "DELETE",
  });
