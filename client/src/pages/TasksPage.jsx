import { useTasks } from "../context/TasksContext";
import TaskBox from "../components/TaskBox";

const TasksPage = () => {
  const { tasks } = useTasks();

  return (
    <>
      <h1>Tasks</h1>
      <div className="container">
        <div className="row">
          {tasks.map((task) => {
            return (
              <div className="col-4 gy-5">
                <TaskBox task={task} key={task} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TasksPage;
