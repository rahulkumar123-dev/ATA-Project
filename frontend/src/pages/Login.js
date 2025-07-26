// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onAuthChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post("http://localhost:8000/api/token/", formData);

    const access = response.data.access;
    const refresh = response.data.refresh;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    if (onAuthChange) onAuthChange(); // still fine
    window.location.href = "/"; // force reload to refresh context
  } catch (err) {
    setError("Invalid username or password.");
  }
};

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              required
              onChange={handleChange}
              value={formData.username}
              autoFocus
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <span>New user?</span>{" "}
          <button type="button" className="btn btn-link p-0" onClick={() => navigate("/register")}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;