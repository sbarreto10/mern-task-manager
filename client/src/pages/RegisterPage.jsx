import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  // register
  const { register, handleSubmit } = useForm();
  const { formState: { errors } } = useForm()
  const { signup, user } = useAuth(); // Los valores del contexto

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  })

  return (
    <div>
      <form
        onSubmit={onSubmit}
      >
        <input
          type="text"
          {...register("username", { required: "this field is required" }, {
            maxLength: 6
        })}
          placeholder="Username"
        />
        {errors.username && <span>errors.username.message</span>}
        <input
          type="email"
          {...register("email", { required: "this field is required" })}
          placeholder="Email"
        />
        {errors.email && <span>errors.email.message</span>}
        <input
          type="password"
          {...register("password", { required: "this field is required" })}
          placeholder="Password"
        />
        {errors.password && <span>errors.password.message</span>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default RegisterPage;
