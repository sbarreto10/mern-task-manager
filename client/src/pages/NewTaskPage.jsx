import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";

function NewTaskPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();

  useEffect(() => {
    document.title = "New task";
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    await createTask({
      title: values.title.length ? values.title : undefined,
      description: values.description.length ? values.description : undefined,
    });
  });

  return (
    <div className={`page-container`}>
      <h1 className="page-title">New task</h1>
      <TaskForm
        id="new-task-form"
        onSubmit={onSubmit}
        register={register}
        operation="Add task"
      />
    </div>
  );
}

export default NewTaskPage;
