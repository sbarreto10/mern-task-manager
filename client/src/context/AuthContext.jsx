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

  // ok you lost me here
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkLogin()
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors, errorsOccurred }}
    >
      {children}
    </AuthContext.Provider>
  );
};
