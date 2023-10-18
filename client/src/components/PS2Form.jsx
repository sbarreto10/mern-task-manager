import React from "react";
import "../assets/ps2sys.css"

const PS2Form = ({onSubmit, register, errors, fields}) => {
  {}
  return (
    <div id="PS2Form-container" className="bg-image">
      <form className="gap-2" onSubmit={onSubmit}>
        {Object.keys(fields).map((key) => <input type={fields[key]} {...register(key)} placeholder={key} />)}
        <button type="submit">Sign in</button>
      </form>
      {Boolean(errors.length) && (
        <div className="d-flex flex-column justify-content-center gap-2 p-2">
          {errors.map((err) => (
            <div className="badge text-bg-secondary align-self-start" key={err}>
              * {err}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PS2Form;
