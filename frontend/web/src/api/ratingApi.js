const BASE = "http://localhost:8000";

export const rateStory = (id, score, comment) =>
  fetch(`${BASE}/community/${id}/rate/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, comment }),
  }).then((r) => r.json());

export const getRatingStats = (id) =>
  fetch(`${BASE}/community/${id}/rating/`).then((r) => r.json());

export const getComments = (id) =>
  fetch(`${BASE}/community/${id}/comments/`).then((r) => r.json());

export const getTopStories = () =>
  fetch(`${BASE}/community/top/`).then((r) => r.json());
