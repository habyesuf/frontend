import { useEffect, useState } from "react";
import { getCourses } from "../../api/courses";
import CourseCard from "../../components/CourseCard";

export default function Catalog() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("loading");

  useEffect(() => {
    const t = setTimeout(() => {
      getCourses({ search })
        .then((c) => { setCourses(c); setState("ready"); })
        .catch(() => setState("error"));
    }, 250);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <>
      <h1>Courses</h1>
      <input className="search" placeholder="Search courses" value={search} onChange={(e) => setSearch(e.target.value)} />
      {state === "loading" && <p className="muted">Loading courses…</p>}
      {state === "error" && <p className="error">Could not load courses. Check that the API is running.</p>}
      {state === "ready" && courses.length === 0 && <p className="muted">No courses match your search.</p>}
      <div className="grid">
        {courses.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </>
  );
}
