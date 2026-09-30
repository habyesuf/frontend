import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses } from "../../api/courses";
import CourseCard from "../../components/CourseCard";

export default function MyCourses() {
  const [courses, setCourses] = useState(null);
  useEffect(() => { getMyCourses().then(setCourses).catch(() => setCourses([])); }, []);

  if (!courses) return <p className="muted">Loading…</p>;
  return (
    <>
      <h1>My learning</h1>
      {courses.length === 0 && <p className="muted">You aren't enrolled in any course yet. <Link to="/">Browse courses</Link></p>}
      <div className="grid">
        {courses.map((c) => <CourseCard key={c.id} course={c} to={`/courses/${c.id}/learn`} />)}
      </div>
    </>
  );
}
