import { useTasks } from "../context/TasksContext";
import TaskBox from "../components/TaskBox";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TasksPage = () => {
  const { user } = useAuth()
  const { tasks, getTasks, deleteTask } = useTasks();

  useEffect(() => {
    getTasks();
    document.title = user.username+" tasks"
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Your tasks</h1>
      <div className="container">
        <div className="row">
          {tasks.map((task) => {
            return (
              <div
                className="col-4 gy-5 position-relative"
                key={`grid-task-${task._id}`}
              >
                <Link className="text-decoration-none" to={`/task/${task._id}`}>
                  <TaskBox task={task} key={`task-${task._id}`} />
                </Link>
                <img
                  src="/trash-can.svg"
                  className="trash-can bg-danger"
                  onClick={async () => {
                    await deleteTask(task._id);
                    await getTasks()
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
