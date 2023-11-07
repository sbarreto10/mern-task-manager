import { useTasks } from "../context/TasksContext";
import TaskBox from "../components/TaskBox";
import { useEffect } from "react";

const TasksPage = () => {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <div className="container">
        <div className="row">
          {tasks.map((task) => {
            return (
              <div className="col-4 gy-5" key={`grid-task-${task._id}`}>
                <TaskBox task={task} key={`task-${task._id}`} />
                <div className="text-danger text-break">{task._id}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TasksPage;
