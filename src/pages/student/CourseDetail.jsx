import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { enroll, getCourse } from "../../api/courses";
import { useAuth } from "../../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { getCourse(id).then(setCourse).catch(() => setError("Course not found.")); }, [id]);

  const onEnroll = async () => {
    if (!user) return navigate("/login", { state: { from: { pathname: `/courses/${id}` } } });
    try { await enroll(id); navigate(`/courses/${id}/learn`); }
    catch { setError("Enrollment failed. Try again."); }
  };

  if (error) return <p className="error">{error}</p>;
  if (!course) return <p className="muted">Loading…</p>;

  return (
    <>
      <h1>{course.title}</h1>
      {course.instructor_name && <p className="muted">Taught by {course.instructor_name}</p>}
      <p>{course.description}</p>
      {course.is_enrolled
        ? <Link className="btn" to={`/courses/${id}/learn`}>Continue learning</Link>
        : <button className="btn" onClick={onEnroll}>Enroll</button>}

      <h2>What's inside</h2>
      {(course.modules || []).map((m) => (
        <div key={m.id} className="panel">
          <h3>{m.title}</h3>
          <ul>{(m.lessons || []).map((l) => <li key={l.id}>{l.title}</li>)}</ul>
        </div>
      ))}
    </>
  );
}
