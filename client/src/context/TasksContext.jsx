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
  const [taskShown, setTaskShown] = useState([])
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
      setTaskShown(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log("Task created!")
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <TasksContext.Provider
      value={{ tasks, taskShown, getTasks, getTask, createTask, deleteTask, errors, errorsOccurred }}
    >
      {children}
    </TasksContext.Provider>
  );
};
