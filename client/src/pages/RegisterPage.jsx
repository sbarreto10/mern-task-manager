import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserForm from "../components/UserForm";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated, errors: errors, errorsOccurred } = useAuth(); // Los valores del contexto
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign up";
  }, []);

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
    <div className="page-container">
      <h1 className="page-title">Sign up</h1>
      <UserForm
        id="login-user-form"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        errorsOccurred={errorsOccurred}
        fields={{ username: "text", email: "text", password: "password" }}
        operation="Sign up"
      />
      <span className="link-to">
        Already have an account? <Link to="/login">Sign in!</Link>
      </span>
    </div>
  );
}

export default RegisterPage;
