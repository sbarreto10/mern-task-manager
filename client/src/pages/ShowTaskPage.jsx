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
    <>
      <div className="h1 text-white p-3">{taskShown.title}</div>
      <div className="text-white w-100 border-top p-3">{taskShown.description}</div>
    </>
  )
}

export default ShowTaskPage