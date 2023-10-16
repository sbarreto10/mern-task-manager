import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <span className="badge rounded-pill text-bg-primary">Home Page</span>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={
              <span className="badge rounded-pill text-bg-info">All tasks</span>
            }
          />
          <Route
            path="/add-task"
            element={
              <span className="badge rounded-pill text-bg-info">Add task</span>
            }
          />
          <Route
            path="/task/:id"
            element={
              <span className="badge rounded-pill text-bg-info">Update task</span>
            }
          />
          <Route
            path="/profile"
            element={
              <span className="badge rounded-pill text-bg-success">Profile</span>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
