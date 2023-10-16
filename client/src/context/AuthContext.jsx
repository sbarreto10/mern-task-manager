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
  const [user, setUser] = useState(null); // Usuario que va a poder ser leído en toda la app
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (user) => {
    try{
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
