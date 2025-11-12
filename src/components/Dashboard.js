import React from "react";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      {role === "student" && <p>Student Dashboard</p>}
      {role === "faculty" && <p>Faculty Dashboard</p>}
      {role === "manager" && <p>Manager Dashboard</p>}
      {role === "owner" && <p>Owner Dashboard</p>}
    </div>
  );
};

export default Dashboard;
