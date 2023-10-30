import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario que va a poder ser leído en toda la app
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorsOccurred, setErrorsOccurred] = useState(false);

  const sign = (requestFunction) => async (user) => {
    try {
      const res = await requestFunction(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const signup = sign(registerRequest)
  const signin = sign(loginRequest)

  useEffect(() => {
    if (Boolean(errors.length)) {
      setErrorsOccurred(true);
      const timeOutErrors = setTimeout(() => {
        setErrors([]);
      }, 5000);
      const timeOutErrorsOccurred = setTimeout(() => {
        setErrorsOccurred(false);
      }, 4000);
      return () => {
        clearTimeout(timeOutErrors);
        clearTimeout(timeOutErrorsOccurred);
      };
    }
  }, [errors]);
  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors, errorsOccurred }}
    >
      {children}
    </AuthContext.Provider>
  );
};
