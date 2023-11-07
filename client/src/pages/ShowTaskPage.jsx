import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

function ShowTaskPage() {
  const { taskShown, getTask } = useTasks();
  const { id } = useParams();

  useEffect(() => {
    getTask(id);
  }, []);

  return (
    <div className="page-container">
      <div className="h1 text-white p-3 align-self-start">{taskShown.title}</div>
      <div className="text-white w-100 border-top p-3">{taskShown.description}</div>
    </div>
  )
}

export default ShowTaskPage