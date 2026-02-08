import { api } from "./client";

// STORIES
export const getStories = () => api("/stories");

// START STORY
export const startStory = (id) => api(`/stories/${id}/start`);

// GET PAGE (this replaces your "current")
export const getPage = (pageId) => api(`/pages/${pageId}`);

// CREATE CHOICE
export const choose = (pageId, nextPageId) =>
  api(`/pages/${pageId}/choices`, {
    method: "POST",
    body: JSON.stringify({
      next_page_id: nextPageId,
    }),
  });
