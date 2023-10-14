import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <span class="badge rounded-pill text-bg-primary">Home Page</span>
          }
        />
        <Route
          path="/register"
          element={
            <span class="badge rounded-pill text-bg-primary">Sign in</span>
          }
        />
        <Route
          path="/login"
          element={
            <span class="badge rounded-pill text-bg-primary">Log in</span>
          }
        />
        <Route
          path="/tasks"
          element={
            <span class="badge rounded-pill text-bg-info">All tasks</span>
          }
        />
        <Route
          path="/add-task"
          element={
            <span class="badge rounded-pill text-bg-info">Add task</span>
          }
        />
        <Route
          path="/task/:id"
          element={
            <span class="badge rounded-pill text-bg-info">Update task</span>
          }
        />
        <Route
          path="/profile"
          element={
            <span class="badge rounded-pill text-bg-success">Profile</span>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
