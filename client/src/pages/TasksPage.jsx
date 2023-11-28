import { useTasks } from "../context/TasksContext";
import TaskBox from "../components/TaskBox";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TasksPage = () => {
   const { user } = useAuth();
   const { tasks, getTasks, deleteTask, taskDeleteTransitions } = useTasks();

   useEffect(() => {
      getTasks();
      document.title = user.username + " tasks";
   }, []);

   const handleDeleteTask = async (id) => {
      await deleteTask(id);
      setTimeout(() => {
         getTasks();
      }, 1000);
   };

   return (
      <div className="page-container">
         <h1 className="page-title">Your tasks</h1>
         <div className="container">
            <div className="row">
               {tasks.map((task) => {
                  return (
                     <div
                        className={`task-box-container opacity-${taskDeleteTransitions[task._id] ? "0" : "1"} col-4 gy-5 position-relative`}
                        id={`grid-task-${task._id}`}
                        key={`grid-task-${task._id}`}
                     >
                        <Link
                           className="text-decoration-none"
                           to={taskDeleteTransitions[task._id] ? null : `/task/${task._id}`}
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
