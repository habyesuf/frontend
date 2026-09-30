import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Catalog from "./pages/student/Catalog";
import CourseDetail from "./pages/student/CourseDetail";
import MyCourses from "./pages/student/MyCourses";
import Learn from "./pages/student/Learn";
import Quiz from "./pages/student/Quiz";
import InstructorHome from "./pages/instructor/InstructorHome";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          <Route element={<ProtectedRoute roles={["student", "instructor", "admin"]} />}>
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/courses/:id/learn" element={<Learn />} />
            <Route path="/quizzes/:id" element={<Quiz />} />
          </Route>

          <Route element={<ProtectedRoute roles={["instructor", "admin"]} />}>
            <Route path="/teach" element={<InstructorHome />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
