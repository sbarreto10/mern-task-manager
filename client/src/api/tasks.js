import axios from "./axios.js"

export const getTasksRequest = () => axios.get(`/tasks`)
export const getTaskRequest = () => axios.get("/tasks/:id");
export const createTaskRequest = (task) => axios.post("/tasks", task);
export const deleteTaskRequest = () => axios.delete("/tasks/:id");
export const updateTaskRequest = (task) => axios.put("/tasks/:id", task);