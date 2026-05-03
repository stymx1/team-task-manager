import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  // FETCH PROJECTS
  const fetchProjects = () => {
    API.get("/projects")
      .then(res => {
        console.log("Projects:", res.data);
        setProjects(res.data);
      })
      .catch(err => console.error("PROJECT FETCH ERROR:", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // CREATE PROJECT
  const createProject = async () => {
    if (!name) {
      alert("Enter project name");
      return;
    }

    try {
      await API.post("/projects", { name });
      setName("");
      fetchProjects();
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Projects</h2>

      {/* CREATE PROJECT */}
      <input
        value={name}
        placeholder="Project name"
        onChange={e => setName(e.target.value)}
      />
      <button onClick={createProject}>Create</button>

      <hr />

      {/* PROJECT LIST */}
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map(p => (
          <div key={p.id}>
            <b>{p.name}</b>

            {/* 🔥 THIS IS THE IMPORTANT FIX */}
            <button
              onClick={() => navigate(`/projects/${p.id}`)}
            >
              Open
            </button>
          </div>
        ))
      )}
    </div>
  );
}