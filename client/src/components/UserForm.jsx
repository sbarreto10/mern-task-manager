import { CSSTransition } from "react-transition-group";
import formStyles from "../assets/form.module.css";
import { useEffect } from "react";

const UserForm = ({
  onSubmit,
  register,
  errors,
  errorsOccurred,
  fields,
  operation,
}) => {
  return (
    <div className={formStyles.formContainer}>
      <form className={`${formStyles.form} gap-4`} onSubmit={onSubmit}>
        {Object.keys(fields).map((key) => (
          <input
            className={`${formStyles.input} shadow-none p-1`}
            type={fields[key]}
            {...register(key)}
            placeholder={key}
            key={`input-${key}`}
          />
        ))}
        <button className={formStyles["button"]} type="submit">{operation}</button>
      </form>
      <CSSTransition
        in={errorsOccurred}
        timeout={1000}
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

export default UserForm;
