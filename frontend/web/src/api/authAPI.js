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

export const login = (username, password) =>
  api("/users/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

export const register = (username, password, role) =>
  api("/users/register/", {
    method: "POST",
    body: JSON.stringify({ username, password, role }),
  });

export const logout = () => api("/users/logout/");

export const me = () => api("/users/me/");
