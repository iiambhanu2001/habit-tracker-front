import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="container header-inner">

        <h1 className="brand">
          <Link to="/" className="brand-link">HabbitTracker</Link>
        </h1>

        <nav>
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/add/" className="nav-link">Add</Link>
        </nav>

      </div>
    </header>
  );
}
