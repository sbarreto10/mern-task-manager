import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorsOccurred, setErrorsOccurred] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sign = (requestFunction) => async (user) => {
    try {
      const res = await requestFunction(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const signup = sign(registerRequest);
  const signin = sign(loginRequest);

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

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        setIsAuthenticated(true);
        setUser(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false)
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors, errorsOccurred, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
