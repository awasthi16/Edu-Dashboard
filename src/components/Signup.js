import React, { useState } from "react";
import api from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="manager">Manager</option>
        <option value="owner">Owner</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
