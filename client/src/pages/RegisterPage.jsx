import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  // register
  const {
    register,
    handleSubmit
  } = useForm();
  const { signup, isAuthenticated, errors: errors } = useAuth(); // Los valores del contexto
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signup({
      username: values.username.length ? values.username : undefined,
      email: values.email.length ? values.email : undefined,
      password: values.password.length ? values.password : undefined,
    });
  });

  console.log(errors);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username")}
          placeholder="Username"
        />
        {errors.username && <span>{errors.username.message}</span>}
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && 
        <span>{errors.password.message}</span>
        }
        <button type="submit">Sign in</button>
      </form>
      
    </div>
  );
}

export default RegisterPage;
