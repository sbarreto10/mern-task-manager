import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./ProtectedRoute";
import TasksPage from "./pages/TasksPage";
import NewTaskPage from "./pages/NewTaskPage";
import ShowTaskPage from "./pages/ShowTaskPage";
import ProfilePage from "./pages/ProfilePage";

import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<NewTaskPage />} />
              <Route path="/task/:id" element={<ShowTaskPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
