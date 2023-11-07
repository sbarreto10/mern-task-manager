import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import UserForm from "../components/UserForm";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin, isAuthenticated, errors: errors, errorsOccurred } = useAuth(); // Los valores del contexto
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signin({
      email: values.email.length ? values.email : undefined,
      password: values.password.length ? values.password : undefined,
    });
  });

  return (
    <div class="page-container">
      <h1 className="page-title">Sign in</h1>
      <UserForm
        id="login-usedr-form"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        errorsOccurred={errorsOccurred}
        fields={{ email: "text", password: "password" }}
        operation="Sign in"
      />
      <span className="link-to">
        Don't have an account? <Link to="/register">Sign up!</Link>
      </span>
    </div>
  );
}

export default LoginPage;
