import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
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

  return (
    <div id="page-container">
      <h1 className="mb-4">Sign up</h1>
      <UserForm
        id="UserForm"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        fields={{ username: "text", email: "text", password: "password" }}
      />
    </div>
  );
}

export default RegisterPage;
