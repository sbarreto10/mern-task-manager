import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();

  const onSubmit = handleSubmit(async (values) => {
    await createTask({
      title: values.title.length ? values.title : undefined,
      description: values.description.length ? values.description : undefined,
    });
  });

  return (
    <div id="page-container">
      <h1 className="mb-4">New task</h1>
      <TaskForm
        id="new-task-form"
        onSubmit={onSubmit}
        register={register}
        operation="Add task"
      />
    </div>
  );
}

export default TaskFormPage;
