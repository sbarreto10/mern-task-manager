import React from "react";
import "../assets/ps2sys.css";

const PS2Form = ({ onSubmit, register, errors, fields }) => {
  return (
    <div id="PS2Form-container" className="bg-image">
      <form className="gap-4" onSubmit={onSubmit}>
        {Object.keys(fields).map((key) => (
          <input
          className="form-control shadow-none p-1"
            type={fields[key]}
            {...register(key)}
            placeholder={key}
            key={`input-${key}`}
          />
        ))}
        <button type="submit">Sign in</button>
      </form>
      {Boolean(errors.length) && (
        <div className="d-flex flex-column gap-2">
          {errors.map((err) => (
            <div
              className="badge text-bg-danger align-self-start opacity-75"
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

export default PS2Form;
