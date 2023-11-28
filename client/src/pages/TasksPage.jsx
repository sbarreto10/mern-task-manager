import { useTasks } from "../context/TasksContext";
import mainStyles from "../assets/task-page.module.css";
import TaskBox from "../components/TaskBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TasksPage = ({ bscol = 4 }) => {
   const { user } = useAuth();
   const { tasks, getTasks, deleteTask, taskDeleteTransitions } = useTasks();
   const taskCols = 12 / bscol;

   useEffect(() => {
      getTasks();
      document.title = user.username + " tasks";
   }, []);

   const handleDeleteTask = async (id) => {
      //Handle animation
      const taskBox = document.getElementById(`grid-task-${id}`);
      let [t, flyAmount, flySide] = [
         0,
         Math.random() + 2,
         Math.floor(2 * Math.random()),
      ];
      flySide = flySide ? flySide : -1;
      const deleteAnimation = setInterval(() => {
         taskBox.style.transform = `translate(${flySide * t}px,${
            flyAmount * (0.2 * t * t - 5 * t)
         }px) rotate(${5 * flySide * t}deg) scale(${-0.005 * t + 1})`;
         t += 1;
      }, 15);

      // Handle delete
      await deleteTask(id);
   };

   return (
      <div className="page-container">
         <h1 className="page-title">Your tasks</h1>
         <div className="container">
            <div className="row">
               {tasks.map((task) => {
                  return (
                     <div
                        className={`${
                           mainStyles["task-box-container"]
                        } opacity-${
                           taskDeleteTransitions[task._id] ? "0" : "1"
                        } col-${bscol} gy-5 position-relative`}
                        id={`grid-task-${task._id}`}
                        key={`grid-task-${task._id}`}
                     >
                        <Link
                           className="text-decoration-none"
                           to={
                              taskDeleteTransitions[task._id]
                                 ? null
                                 : `/task/${task._id}`
                           }
                        >
                           <TaskBox task={task} key={`task-${task._id}`} />
                        </Link>
                        <img
                           src="/trash-can.svg"
                           className="trash-can bg-danger"
                           onClick={() => {
                              handleDeleteTask(task._id);
                           }}
                           alt="delete button"
                        />
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default TasksPage;
