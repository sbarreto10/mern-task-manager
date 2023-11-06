import { createContext, useState, useContext, useEffect } from "react";
import {
  getTaskRequest,
  createTaskRequest
} from "../api/tasks.js";
// import Cookies from "js-cookie";

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

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask }}>{children}</TasksContext.Provider>
  );
};
