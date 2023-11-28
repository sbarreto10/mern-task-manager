import mainStyles from "../assets/task-page.module.css";

const TaskBox = ({ task }) => {
   return (
      <div
         className={`${mainStyles["task-container"]} overflow-hidden`}
         key={`task-container-${task._id}`}
      >
         <div className="h2 w-100">{task.title}</div>
         <div className={`${mainStyles["task-box-body"]} border-top`}>
            {task.description}
         </div>
         <div className={mainStyles["foot-shadow"]} />
      </div>
   );
};

export default TaskBox;
