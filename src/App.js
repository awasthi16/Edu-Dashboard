import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Signup />
      <hr />
      <Login />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;
