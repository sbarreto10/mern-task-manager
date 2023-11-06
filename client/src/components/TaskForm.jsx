import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../assets/task-form.css";

const TaskForm = ({ onSubmit, register, operation }) => {
  return (
    <div id="form-container">
      <form
        className="gap-4"
        onSubmit={onSubmit}
      >
        <input
          className="shadow-none p-1"
          type="text"
          {...register("title")}
          placeholder="Title"
          key="input-task-title"
        />
        <textarea
          className="shadow-none p-1"
          {...register("description")}
          placeholder="Description"
          key="input-task-description"
        />
        <button type="submit">{operation}</button>
      </form>
      {/* <CSSTransition
        in={errorsOccurred}
        timeout={1000}
        classNames={"input-errors"}
      >
        <div className="error-container">
          {errors.map((err) => (
            <div className="input-error" key={err}>
              {err}
            </div>
          ))}
        </div>
      </CSSTransition> */}
    </div>
  );
};

export default TaskForm;
