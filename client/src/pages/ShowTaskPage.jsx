import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

function ShowTaskPage() {
  const { tasks, getTask } = useTasks();
  const { id } = useParams();

  useEffect(() => {
    getTask(id);
    console.log(tasks);
  }, []);

  return (
    <>
      <div className="h1 text-white p-3">{tasks.title}</div>
      <div className="text-white w-100 border-top p-3">{tasks.description}</div>
    </>
  )
}

export default ShowTaskPage