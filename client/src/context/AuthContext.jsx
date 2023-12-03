import { createContext, useState, useContext, useEffect } from "react";
import {
   registerRequest,
   loginRequest,
   logoutRequest,
   authRequest,
} from "../api/auth.js";
import {
   getProfileRequest,
   changeUsernameRequest,
   changePasswordRequest,
} from "../api/profile.js";
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
   const [navLinks, setNavLinks] = useState([
      { name: "Login", route: "/login" },
      { name: "Signin", route: "/register" },
   ]);
   const [profileDataChanged, setProfileDataChanged] = useState([false, null]);

   const sign = (requestFunction) => async (user) => {
      try {
         const res = await requestFunction(user);
         setUser(res.data);
         setIsAuthenticated(true);
      } catch (err) {
         setErrors(err.response.data);
      }
   };

   const changeProfileData = (requestFunction) => async (data) => {
      try {
         await requestFunction(data);
         if (data.newUsername) {
            setProfileDataChanged([true, "Username changed successfully"]);
            return data.newUsername;
         }
         if (data.newPassword)
            setProfileDataChanged([true, "Password changed successfully"]);
      } catch (err) {
         setErrors(err.response.data);
      }
   };

   const signup = sign(registerRequest);
   const signin = sign(loginRequest);
   const changeUsername = changeProfileData(changeUsernameRequest);
   const changePassword = changeProfileData(changePasswordRequest);

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

   const handleErr = (err) => {
      console.log(err);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
   };

   const handleProfileRequest = async () => {
      const res = await getProfileRequest();
      setIsAuthenticated(true);
      setUser(res.data);
      setIsLoading(false);
   };

   useEffect(() => {
      const checkLogin = async () => {
         try {
            if (!localStorage.getItem("token")) {
               const res = await authRequest();
               if (res.data.token) {
                  await handleProfileRequest();
                  localStorage.setItem("token", res.data.token);
               } else {
                  handleErr(res.data);
               }
            } else {
               await handleProfileRequest();
            }
         } catch (err) {
            handleErr(err);
         }
      };

      checkLogin();
   }, []);

   useEffect(() => {
      if (isAuthenticated)
         setNavLinks([
            { name: "Tasks", route: "/tasks" },
            { name: "New Task", route: "/add-task" },
            { name: "Profile", route: "/profile" },
            {
               name: "Logout",
               route: "/",
               onClick: async () => {
                  setIsAuthenticated(false)
                  await logoutRequest();
                  localStorage.removeItem("token");
               },
            },
         ]);
      else
         setNavLinks([
            { name: "Sign in", route: "/login" },
            { name: "Sign up", route: "/register" },
         ]);
   }, [isAuthenticated]);

   useEffect(() => {
      if (profileDataChanged[0]) {
         const timeOutProfileDataChanged = setTimeout(() => {
            setProfileDataChanged([false, profileDataChanged[1]]);
         }, 4000);
         return () => {
            clearTimeout(timeOutProfileDataChanged);
         };
      }
   }, [profileDataChanged]);

   return (
      <AuthContext.Provider
         value={{
            signup,
            signin,
            changeUsername,
            changePassword,
            user,
            isAuthenticated,
            errors,
            setErrors,
            errorsOccurred,
            setErrorsOccurred,
            isLoading,
            navLinks,
            profileDataChanged,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
