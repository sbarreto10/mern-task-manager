import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import formStyles from "../assets/form.module.css";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";

const TaskForm = ({ onSubmit, register, operation }) => {
  const { errors, errorsOccurred } = useAuth();
  const { taskCreated } = useTasks();

  return (
    <div className={`${formStyles.formContainer} ${taskCreated ? formStyles.formFadeOut : ""}`}>
      <form className={`${formStyles.form} gap-4`} onSubmit={onSubmit}>
        <input
          className={`${formStyles.input} shadow-none p-1`}
          type="text"
          {...register("title")}
          placeholder="Title"
          key="input-task-title"
        />
        <textarea
          className={`${formStyles.textarea} shadow-none p-1`}
          {...register("description")}
          placeholder="Description"
          key="input-task-description"
        />
        <button className={formStyles["button"]} type="submit">{operation}</button>
      </form>
      <CSSTransition
        in={errorsOccurred}
        timeout={1000}
        mountOnEnter
        unmountOnExit
        classNames={{
          exitActive: formStyles.inputErrorsExit
        }}
      >
        <div className={formStyles.errorContainer}>
          {errors.map((err) => (
            <div className={formStyles.inputError} key={err}>
              {err}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default TaskForm;
