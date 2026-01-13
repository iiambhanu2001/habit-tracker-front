import React, { useState } from "react";
import api from "../api/jwt";
import { useNavigate } from "react-router-dom";
import "./auth.css"

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (error) {
      alert("singupfailed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={Handlesubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="passwrod"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
