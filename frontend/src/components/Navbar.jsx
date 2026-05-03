import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/projects">Projects</Link>{" "}
      <button onClick={logout}>Logout</button>
      <hr />
    </div>
  );
}