import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || "/my-courses", { replace: true });
    } catch {
      setError("Email or password is incorrect.");
    }
  };

  return (
    <form className="panel narrow" onSubmit={onSubmit}>
      <h1>Log in</h1>
      {error && <p className="error">{error}</p>}
      <label>Email
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <label>Password
        <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </label>
      <button className="btn">Log in</button>
      <p className="muted">No account? <Link to="/register">Sign up</Link></p>
    </form>
  );
}
