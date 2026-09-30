import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { completeLesson, getCourse } from "../../api/courses";
import ProgressBar from "../../components/ProgressBar";

function LessonContent({ lesson }) {
  if (lesson.content_type === "video")
    return <iframe className="video" src={lesson.content} title={lesson.title} allowFullScreen />;
  if (lesson.content_type === "file")
    return <a className="btn" href={lesson.content} target="_blank" rel="noreferrer">Open file</a>;
  return <div className="prose">{lesson.content}</div>;
}

export default function Learn() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourse(id)
      .then((c) => {
        setCourse(c);
        const all = c.modules.flatMap((m) => m.lessons);
        setCurrentId((all.find((l) => !l.completed) || all[0])?.id ?? null);
      })
      .catch(() => setError("You need to enroll in this course first."));
  }, [id]);

  const lessons = useMemo(() => course?.modules.flatMap((m) => m.lessons) ?? [], [course]);
  const current = lessons.find((l) => l.id === currentId);
  const done = lessons.filter((l) => l.completed).length;
  const progress = lessons.length ? (done / lessons.length) * 100 : 0;

  const markComplete = async () => {
    await completeLesson(current.id);
    setCourse((c) => ({
      ...c,
      modules: c.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) => (l.id === current.id ? { ...l, completed: true } : l)),
      })),
    }));
    const next = lessons[lessons.findIndex((l) => l.id === current.id) + 1];
    if (next) setCurrentId(next.id);
  };

  if (error) return <p className="error">{error} <Link to={`/courses/${id}`}>Go to course page</Link></p>;
  if (!course) return <p className="muted">Loading…</p>;

  return (
    <div className="learn">
      <aside className="sidebar">
        <h2>{course.title}</h2>
        <ProgressBar value={progress} />
        {course.modules.map((m) => (
          <div key={m.id}>
            <h4>{m.title}</h4>
            {m.lessons.map((l) => (
              <button key={l.id} className={`lesson-btn ${l.id === currentId ? "active" : ""}`} onClick={() => setCurrentId(l.id)}>
                <span aria-hidden>{l.completed ? "✓" : "○"}</span> {l.title}
              </button>
            ))}
          </div>
        ))}
        {(course.quizzes || []).length > 0 && <h4>Quizzes</h4>}
        {(course.quizzes || []).map((q) => (
          <Link key={q.id} className="lesson-btn" to={`/quizzes/${q.id}`}>{q.title}</Link>
        ))}
      </aside>

      <section>
        {current ? (
          <>
            <h1>{current.title}</h1>
            <LessonContent lesson={current} />
            {current.completed
              ? <p className="success">Lesson completed</p>
              : <button className="btn" onClick={markComplete}>Mark as complete</button>}
          </>
        ) : <p className="muted">This course has no lessons yet.</p>}
      </section>
    </div>
  );
}
