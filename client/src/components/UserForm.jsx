import { CSSTransition } from "react-transition-group";
import "../assets/user-form.css";

const UserForm = ({
  onSubmit,
  register,
  errors,
  errorsOccurred,
  fields,
  operation,
}) => {
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
        <button type="submit">{operation}</button>
      </form>
      <CSSTransition
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
      </CSSTransition>
    </div>
  );
};

export default UserForm;
