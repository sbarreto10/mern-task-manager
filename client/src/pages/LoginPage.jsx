import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { user, signin, isAuthenticated, errors: errors } = useAuth(); // Los valores del contexto
  const onSubmit = handleSubmit(async (values) => {
    await signin({
      email: values.email.length ? values.email : undefined,
      password: values.password.length ? values.password : undefined,
    });
  });
  
  if(user!=null)
  console.log("logged as", user.username);

  return (
    <div id="page-container">
      <h1 className="mb-4">Sign in</h1>
      <UserForm
        id="PS2Form"
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        fields={{ email: "text", password: "password" }}
        operation="Sign in"
      />
    </div>
  );
}

export default LoginPage;
