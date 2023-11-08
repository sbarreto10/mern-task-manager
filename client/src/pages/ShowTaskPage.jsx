import { useTasks } from "../context/TasksContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowTaskPage() {
  const { taskShown, getTask, isLoadingTask } = useTasks();
  const { id } = useParams();

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    document.title = taskShown.title;
  }, [taskShown]);

  useEffect(() => {
    getTask(id);
  }, []);

  useEffect(() => {
    setLoader(isLoadingTask)
  }, [isLoadingTask]);

  return (
    <div className="page-container">
      {loader && <img src="/loader.gif" width={200} alt="Loading..." className="p-3" />}
      {!isLoadingTask && (
        <>
          <div className="h1 text-white p-3 align-self-start">
            {taskShown.title}
          </div>
          <div className="text-white w-100 border-top p-3">
            {taskShown.description}
          </div>
        </>
      )}
    </div>
  );
}

export default ShowTaskPage;
