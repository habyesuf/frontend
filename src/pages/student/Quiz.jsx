import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, submitQuiz } from "../../api/courses";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { getQuiz(id).then(setQuiz).catch(() => setError("Could not load this quiz.")); }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { setResult(await submitQuiz(id, answers)); }
    catch { setError("Could not submit. Try again."); }
  };

  if (error) return <p className="error">{error}</p>;
  if (!quiz) return <p className="muted">Loading…</p>;

  if (result)
    return (
      <div className="panel narrow">
        <h1>{result.passed ? "You passed" : "Not passed yet"}</h1>
        <p>Your score: {result.score}%</p>
        <button className="btn" onClick={() => { setResult(null); setAnswers({}); }}>Try again</button>
      </div>
    );

  const unanswered = quiz.questions.length - Object.keys(answers).length;

  return (
    <form onSubmit={onSubmit}>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((q, i) => (
        <fieldset key={q.id} className="panel">
          <legend>{i + 1}. {q.text}</legend>
          {q.choices.map((c) => (
            <label key={c.id} className="choice">
              <input type="radio" name={`q${q.id}`} checked={answers[q.id] === c.id}
                onChange={() => setAnswers({ ...answers, [q.id]: c.id })} />
              {c.text}
            </label>
          ))}
        </fieldset>
      ))}
      <button className="btn" disabled={unanswered > 0}>
        {unanswered > 0 ? `${unanswered} unanswered` : "Submit answers"}
      </button>
    </form>
  );
}
