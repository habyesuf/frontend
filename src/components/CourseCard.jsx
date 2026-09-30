import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ course, to }) {
  return (
    <Link to={to || `/courses/${course.id}`} className="card">
      <h3>{course.title}</h3>
      {course.instructor_name && <p className="muted">By {course.instructor_name}</p>}
      {course.description && <p className="clamp">{course.description}</p>}
      {course.progress !== undefined && <ProgressBar value={course.progress} />}
    </Link>
  );
}
