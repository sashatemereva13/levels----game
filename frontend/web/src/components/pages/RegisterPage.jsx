import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../ui/AuthLayout";
import "../../css/Auth.css";
import { Canvas } from "@react-three/fiber";
import MagicBall from "../../three/MagicBall";
import MagicBall2 from "../../three/MagicBall2";

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("reader");

  const submit = async (e) => {
    e.preventDefault();
    await register(email, password, role);
    if (role === "author") {
      nav("/dashboard");
    } else {
      nav("/levels");
    }
  };

  return (
    <AuthLayout title="Create account">
      <div className="canvasWrapper"></div>
      <form onSubmit={submit} className="authForm">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="roleToggle">
          <button
            type="button"
            className={`roleButton ${role === "reader" ? "active" : ""}`}
            onClick={() => setRole("reader")}
          >
            Reader
          </button>

          <button
            type="button"
            className={`roleButton ${role === "author" ? "active" : ""}`}
            onClick={() => setRole("author")}
          >
            Author
          </button>
        </div>

        <button className="submit" type="submit">
          Register
        </button>

        <p className="authLink">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
