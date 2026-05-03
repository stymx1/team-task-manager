import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function ProjectPage() {
  const { id } = useParams();
  console.log("Current Project ID:", id);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  const [title, setTitle] = useState("");
  const [assigned, setAssigned] = useState("");

  const load = async () => {
    const t = await API.get("/tasks");
    setTasks(t.data.filter(x => x.projectId === id));

    const u = await API.get("/users");
    setUsers(u.data);

    const p = await API.get("/projects");
    const project = p.data.find(x => x.id === id);
    setMembers(project?.members || []);
  };

  useEffect(() => { load(); }, []);

  const createTask = async () => {
    await API.post("/tasks", {
      title,
      description: "test",
      dueDate: new Date().toISOString(),
      priority: "HIGH",
      projectId: id,
      assignedTo: assigned
    });
    load();
  };

  const updateStatus = async (tid, status) => {
    await API.put(`/tasks/${tid}`, { status });
    load();
  };

  const addMember = async () => {
    await API.post(`/projects/${id}/add-member`, { userId: assigned });
    load();
  };

  const removeMember = async (uid) => {
    await API.post(`/projects/${id}/remove-member`, { userId: uid });
    load();
  };

  return (
    <div>
      <h2>Project Details</h2>

      <h3>Members</h3>
      {members.map(m => (
        <div key={m.userId}>
          {m.user?.name}
          <button onClick={() => removeMember(m.userId)}>Remove</button>
        </div>
      ))}

      <select onChange={e => setAssigned(e.target.value)}>
        <option>Select user</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
      <button onClick={addMember}>Add Member</button>

      <hr />

      <h3>Create Task</h3>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <button onClick={createTask}>Create</button>

      <hr />

      <h3>Tasks</h3>
      {tasks.map(t => (
        <div key={t.id}>
          <b>{t.title}</b> - {t.status} ({t.user?.name})
          <button onClick={() => updateStatus(t.id, "TODO")}>TODO</button>
          <button onClick={() => updateStatus(t.id, "IN_PROGRESS")}>IN_PROGRESS</button>
          <button onClick={() => updateStatus(t.id, "DONE")}>DONE</button>
        </div>
      ))}
    </div>
  );
  
}