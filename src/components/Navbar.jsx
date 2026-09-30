import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const canTeach = user && ["instructor", "admin"].includes(user.role);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">LMS</Link>
        <nav>
          <Link to="/">Courses</Link>
          {user && <Link to="/my-courses">My learning</Link>}
          {canTeach && <Link to="/teach">Teach</Link>}
          {user ? (
            <button className="link" onClick={() => { logout(); navigate("/"); }}>
              Log out ({user.name || user.email})
            </button>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register" className="btn small">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
