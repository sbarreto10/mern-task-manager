import mainStyles from "../assets/task-page.module.css";
import { useNavigate } from "react-router-dom";

const TaskBox = ({ task, trashFunction }) => {
   const navigate = useNavigate();

   return (
      <div
         className={`${mainStyles["task-container"]} overflow-hidden`}
         key={`task-container-${task._id}`}
         onClick={(event) => {
            if(!event.target.className.includes(mainStyles["trash-can"])) navigate(`/task/${task._id}`)
          }}
      >
         <img
            src="/trash-can.svg"
            className={`${mainStyles["trash-can"]} bg-danger`}
            onClick={trashFunction}
            alt="delete button"
         />
         <div className="h2 w-100">{task.title}</div>
         <div className={`${mainStyles["task-box-body"]} border-top`}>
            {task.description}
         </div>
         <div className={mainStyles["foot-shadow"]} />
      </div>
   );
};

export default TaskBox;
