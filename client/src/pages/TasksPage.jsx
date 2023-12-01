import { useTasks } from "../context/TasksContext";
import mainStyles from "../assets/task-page.module.css";
import TaskBox from "../components/TaskBox";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TasksPage = ({ bscol = 4 }) => {
   const { user } = useAuth();
   const { tasks, getTasks, deleteTask, taskDeleteTransitions } = useTasks();
   const [tasksLoaded, setTasksLoaded] = useState(false);

   useEffect(() => {
      getTasks();
      document.title = user.username + " tasks";
   }, []);

   useEffect(() => {
      if (tasks.length > 0) {
         setTasksLoaded(true);
      }
      if (tasksLoaded) {
         // some shit
      }
   }, [tasks]);

   const handleDeleteAnimation = (box) => {
      let [t, flyAmount, flySide] = [
         0,
         Math.random() + 2,
         Math.floor(2 * Math.random()),
      ];
      flySide = flySide ? flySide : -1;
      const animationInterval = setInterval(() => {
         box.style.transform = `translate(${flySide * t}px,${
            flyAmount * (0.2 * t * t - 5 * t)
         }px) rotate(${5 * flySide * t}deg) scale(${1/(0.1*t+1)})`;
         t += 1;
      }, 10);
      setTimeout(() => {
         clearTimeout(animationInterval);
         box.style.display = "none";
      }, 500);
   };

   const handleDeleteTask = async (id) => {
      // Delete
      await deleteTask(id);

      // Animation
      const taskBox = document.getElementById(`grid-task-${id}`);
      handleDeleteAnimation(taskBox);

      // Refresh
      setTimeout(() => {
         getTasks();
      }, 500);
   };

   return (
      <div className="page-container">
         <h1 className="page-title">Your tasks</h1>
         <div className="container">
            <div className="row">
               {tasks.map((task, index) => {
                  return (
                     <div
                        className={`${mainStyles["task-box-container"]} opacity-${
                           taskDeleteTransitions[task._id] ? "0" : "1"
                        } col-${bscol} gy-5 position-relative`}
                        id={`grid-task-${task._id}`}
                        key={`grid-task-${task._id}`}
                     >
                        <TaskBox
                           task={task}
                           trashFunction={() => handleDeleteTask(task._id)}
                           key={`task-${task._id}`}
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
