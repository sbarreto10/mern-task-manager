import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PS2Form from "../components/PS2Form";

function LoginPage() {
  return (
    <div id="page-container">
      <h1>Log in</h1>
    </div>
  );
}

export default LoginPage;
