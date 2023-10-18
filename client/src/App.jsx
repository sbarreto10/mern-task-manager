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
              <span className="badge rounded-pill text-bg-primary">
                Home Page
              </span>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={
              <div id="page-container">
                <h1>Tasks</h1>
              </div>
            }
          />
          <Route
            path="/add-task"
            element={
              <div id="page-container">
                <h1>New task</h1>
              </div>
            }
          />
          <Route
            path="/task/:id"
            element={
              <div id="page-container">
                <h1>Edit task</h1>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div id="page-container">
                <h1>Profile</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
