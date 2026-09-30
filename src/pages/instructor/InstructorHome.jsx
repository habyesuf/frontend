import { useEffect, useState } from "react";
import { createCourse, getCourses } from "../../api/courses";
import CourseCard from "../../components/CourseCard";

export default function InstructorHome() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const load = () => getCourses({ mine: true }).then(setCourses).catch(() => setError("Could not load your courses."));
  useEffect(() => { load(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await createCourse({ ...form, status: "draft" });
      setForm({ title: "", description: "" });
      load();
    } catch { setError("Could not create the course."); }
  };

  return (
    <>
      <h1>Teach</h1>
      {error && <p className="error">{error}</p>}
      <form className="panel" onSubmit={onCreate}>
        <h2>New course</h2>
        <label>Title <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label>Description <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <button className="btn">Create draft</button>
      </form>
      <h2>Your courses</h2>
      {courses.length === 0 && <p className="muted">You haven't created any courses yet.</p>}
      <div className="grid">{courses.map((c) => <CourseCard key={c.id} course={c} />)}</div>
    </>
  );
}
