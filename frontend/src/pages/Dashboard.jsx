import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/tasks/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
         <Navbar />   {/* 👈 THIS WAS MISSING */}
      <h2>Total Tasks: {data.total}</h2>
      <p>TODO: {data.grouped.TODO}</p>
      <p>IN_PROGRESS: {data.grouped.IN_PROGRESS}</p>
      <p>DONE: {data.grouped.DONE}</p>
      <p>Overdue: {data.overdue}</p>
    </div>
  );
}