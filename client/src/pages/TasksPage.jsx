import { useTasks } from "../context/TasksContext";
import TaskBox from "../components/TaskBox";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
                <Link className="text-decoration-none" to={`/task/${task._id}`}>
                  <TaskBox task={task} key={`task-${task._id}`} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TasksPage;
