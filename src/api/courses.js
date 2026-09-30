import client, { unwrap } from "./client";

export const getCourses = (params) => client.get("/courses/", { params }).then(unwrap);
export const getCourse = (id) => client.get(`/courses/${id}/`).then((r) => r.data);
export const createCourse = (data) => client.post("/courses/", data).then((r) => r.data);
export const enroll = (id) => client.post(`/courses/${id}/enroll/`).then((r) => r.data);
export const getMyCourses = () => client.get("/my-courses/").then(unwrap);
export const completeLesson = (id) => client.post(`/lessons/${id}/complete/`).then((r) => r.data);
export const getQuiz = (id) => client.get(`/quizzes/${id}/`).then((r) => r.data);
export const submitQuiz = (id, answers) =>
  client.post(`/quizzes/${id}/submit/`, { answers }).then((r) => r.data);
