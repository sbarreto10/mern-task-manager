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

export const tasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider
      value={{  }}
    >
      {children}
    </TasksContext.Provider>
  );
};
