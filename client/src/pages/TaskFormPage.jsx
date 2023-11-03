import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { user, isAuthenticated, errors: errors, errorsOccurred } = useAuth(); // Los valores del contexto

  const onSubmit = handleSubmit(async (values) => {
    await signin({
      title: values.title.length ? values.title : undefined,
      description: values.description.length ? values.description : undefined,
      date: values.date.length ? values.date : undefined,
      user: user
    });
  });

  return (
    <div id="page-container">
      <h1 className="mb-4">New task</h1>
      <TaskForm
        id="new-task-form"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        errorsOccurred={errorsOccurred}
        operation="Add task"
      />
    </div>
  );
}

export default TaskFormPage