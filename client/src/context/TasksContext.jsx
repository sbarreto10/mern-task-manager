import { createContext, useState, useContext, useEffect } from "react";
// import {
//   registerRequest,
//   loginRequest,
//   verifyTokenRequest,
// } from "../api/auth.js";
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

  useEffect(() => { setTasks(["task1", "task2", "task3","task4", "task5", "task6", "task7"]) },[])

  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  );
};
