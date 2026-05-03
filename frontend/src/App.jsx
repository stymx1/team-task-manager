import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import ProjectPage from "./pages/ProjectPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/projects"
          element={<ProtectedRoute><Project /></ProtectedRoute>}
        />

        <Route
          path="/projects/:id"
          element={<ProtectedRoute><ProjectPage /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;