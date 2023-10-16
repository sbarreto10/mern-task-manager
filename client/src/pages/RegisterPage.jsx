import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  // register
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth(); // Los valores del contexto
  const navigate = useNavigate() 

  useEffect(() => {
    if(isAuthenticated) navigate("/tasks")
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  })

  return (
    <div>
      <form
        onSubmit={onSubmit}
      >
        <input
          type="text"
          {...register("username", { required: "this field is required" })}
          placeholder="Username"
        />
        <input
          type="email"
          {...register("email", { required: "this field is required" })}
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", { required: "this field is required" })}
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default RegisterPage;
