import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div id="page-container">
      <h1 className="mb-4">Sign in</h1>
      <UserForm
        id="PS2Form"
        onSubmit={onSubmit}
        register={register}
        errors={[]}
        fields={{ email: "text", password: "password" }}
      />
    </div>
  );
}

export default LoginPage;
