import "../assets/task-box.css";

const TaskBox = ({ task }) => {
  return <div className="task-container overflow-hidden" key={`task-container-${task._id}`}>
    <div className="title h2" alt={task.title}>{task.title}</div>
    <div className="description w-100 border-top py-2 px-1">{task.description}</div>
  </div>;
}

export default TaskBox;
