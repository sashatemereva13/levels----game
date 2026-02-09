import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../ui/AuthLayout";
import "../../css/Auth.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await register(email, password);
    nav("/levels");
  };

  return (
    <AuthLayout title="Create account">
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

        <button type="submit">Register</button>

        <p className="authLink">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
