import React from "react";
import "../assets/user-form.css";

const UserForm = ({ onSubmit, register, errors, fields }) => {
  return (
    <div id="form-container">
      <form className="gap-4" onSubmit={onSubmit}>
        {Object.keys(fields).map((key) => (
          <input
          className="shadow-none p-1"
            type={fields[key]}
            {...register(key)}
            placeholder={key}
            key={`input-${key}`}
          />
        ))}
        <button type="submit">Sign in</button>
      </form>
      {Boolean(errors.length) && (
        <div className="error-container">
          {errors.map((err) => (
            <div
              className="input-error"
              key={err}
            >
              {err}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserForm;
