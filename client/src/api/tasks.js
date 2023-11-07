import axios from "./axios.js"

export const getTasksRequest = () => axios.get(`/tasks`)
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);
export const createTaskRequest = (task) => axios.post("/tasks", task);
export const deleteTaskRequest = (task) => axios.delete(`/tasks/${task._id}`);
export const updateTaskRequest = (task) => axios.put(`/tasks/${task._id}`, task);