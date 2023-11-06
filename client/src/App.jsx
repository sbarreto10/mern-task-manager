import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ShowTaskPage from "./pages/ShowTaskPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <span className="badge rounded-pill text-bg-primary">
                  Home Page
                </span>
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
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
