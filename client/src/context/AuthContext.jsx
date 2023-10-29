import { createContext, useState, useContext } from "react";
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

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
