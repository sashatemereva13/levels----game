import { StrictMode } from "react";
import App from "./App.jsx";
import PlayScene from "./components/pages/PlayScene.jsx";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { PageWrapper } from "./utils/PageWrapper";
import BackgroundFX from "./three/BackgroundFX.jsx";
import LevelsPage from "./components/pages/LevelsPage.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <BackgroundFX />
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <App />
            </PageWrapper>
          }
        />
        <Route
          path="/levels"
          element={
            <PageWrapper>
              <LevelsPage />
            </PageWrapper>
          }
        />
        <Route
          path="/play/:storyId"
          element={
            <PageWrapper>
              <PlayScene />
            </PageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
