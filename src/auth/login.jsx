import React, { useState } from "react";
import api from "../api/jwt";
import { useNavigate } from "react-router-dom";
import "./auth.css"
const Login = ({ setlogin }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      if(!res.data.token) {
        throw new Error("No token received")
      }
      localStorage.setItem("token", res.data.token);
      setlogin(true);
      navigate("/");
    } catch (error) {
      alert("oops! You are entering wrong");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={Handlesubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
  </div>
  );
};

export default Login;
