import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "../api/tasks.js";

export const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within an TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { errors, setErrors, errorsOccurred } = useAuth();

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  

  return (
    <TasksContext.Provider
      value={{ tasks, getTasks, getTask, createTask, errors, errorsOccurred }}
    >
      {children}
    </TasksContext.Provider>
  );
};
