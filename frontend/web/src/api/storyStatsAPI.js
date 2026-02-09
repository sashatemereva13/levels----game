const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = (path) =>
  fetch(`${BASE}${path}`, {
    credentials: "include",
  }).then((r) => r.json());

export const getPlayStats = (id) => api(`/gameplay/${id}/stats`);

export const getRatingStats = (id) => api(`/community/${id}/rating-stats/`);
