import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PS2Form from "../components/PS2Form";

function LoginPage() {
  return (
    <div id="page-container">
      <h1 className="mb-4">Sign in</h1>
      <PS2Form id="PS2Form" onSubmit={onSubmit} form={register} errors={errors} fields= {{"username": "text","email": "text","password": "password"}}/>
    </div>
  );
}

export default LoginPage;
