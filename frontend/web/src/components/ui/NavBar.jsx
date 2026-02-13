import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "../../css/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav("/");
  };

  return (
    <nav className="navBar">
      <div className="navLeft">
        <Link to="/" className="navLogo">
          selfinder
        </Link>
      </div>

      <div className="navRight">
        {!user && (
          <>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
          </>
        )}

        {user && (
          <>
            {user?.role == "author" && <Link to="/dashboard">dashboard</Link>}

            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
