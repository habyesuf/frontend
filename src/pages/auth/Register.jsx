import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(JSON.stringify(err.response?.data || "Could not create the account."));
    }
  };

  return (
    <form className="panel narrow" onSubmit={onSubmit}>
      <h1>Create an account</h1>
      {error && <p className="error">{error}</p>}
      <label>Full name <input required value={form.name} onChange={set("name")} /></label>
      <label>Email <input type="email" required value={form.email} onChange={set("email")} /></label>
      <label>Password <input type="password" minLength={8} required value={form.password} onChange={set("password")} /></label>
      <label>I want to
        <select value={form.role} onChange={set("role")}>
          <option value="student">Take courses</option>
          <option value="instructor">Teach courses</option>
        </select>
      </label>
      <button className="btn">Sign up</button>
      <p className="muted">Already registered? <Link to="/login">Log in</Link></p>
    </form>
  );
}
