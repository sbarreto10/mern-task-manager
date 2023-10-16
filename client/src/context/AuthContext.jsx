import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null); // Usuario que va a poder ser leído en toda la app

  const signup = async (user) => {
    const res = await registerRequest(user);
    setUser(res.data);
    console.log(user);
  };

  return (
    <AuthContext.Provider value={{ signup, user }}>
      {children}
    </AuthContext.Provider>
  );
};
