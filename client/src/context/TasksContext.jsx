import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getTaskRequest, createTaskRequest } from "../api/tasks.js";

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

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      tasks
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, errors, errorsOccurred }}
    >
      {children}
    </TasksContext.Provider>
  );
};
