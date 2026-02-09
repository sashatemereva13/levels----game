import { StrictMode } from "react";
import App from "./App.jsx";
import PlayScene from "./components/pages/PlayScene.jsx";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard.jsx";
import { PageWrapper } from "./utils/PageWrapper";
import BackgroundFX from "./three/BackgroundFX.jsx";
import LevelsPage from "./components/pages/LevelsPage.jsx";
import Navbar from "./components/ui/NavBar.jsx";
import StoryEditor from "./components/pages/StoryEditor.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    {/* <BackgroundFX /> */}

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
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

          <Route
            path="/login"
            element={
              <PageWrapper>
                <LoginPage />
              </PageWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <PageWrapper>
                <RegisterPage />
              </PageWrapper>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="author">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/edit/:storyId"
            element={
              <ProtectedRoute role="author">
                <PageWrapper>
                  <StoryEditor />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
