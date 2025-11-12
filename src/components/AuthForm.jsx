import React, { useState } from "react";
import api from "../api";

const roles = ["student", "faculty", "manager", "owner"];

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: roles[0],
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (mode === "signup") {
        const { data } = await api.post("/auth/signup", form);
        setMessage(data.message);
        setMode("login");
      } else {
        const { data } = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        setMessage("Login successful — token saved");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const checkProtected = async () => {
    try {
      const { data } = await api.get("/protected/manager");
      setMessage(`Protected route says: ${data.msg}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Unauthorized");
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${
            mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`px-3 py-1 rounded ${
            mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <div>
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {mode === "signup" && (
          <div>
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Please wait..." : mode === "signup" ? "Signup" : "Login"}
        </button>
      </form>

      <div className="mt-3">
        <button
          onClick={checkProtected}
          className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
        >
          Access Protected Route (Manager/Owner)
        </button>
      </div>

      {message && <div className="mt-4 text-gray-700">{message}</div>}
    </div>
  );
}
