import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/App.css"

export default function Header({islogedin,setlogin}) {
  const navigate = useNavigate();


  const logout=()=>{
    localStorage.removeItem("token")
    setlogin(false)
    navigate("/login")
  }
  return (
    <header className="app-header">
      <div className="container header-inner">
        <h1 className="brand">
          <Link to="/" className="brand-link">
            HabbitTracker
          </Link>
        </h1>

        <nav>
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/add/" className="nav-link">
            Add
          </Link>
          {!islogedin ?
          <>
          <Link to="/login" className="nav-link">
             Login
          </Link>
           <Link to="/signup" className="nav-link">
             Signup
          </Link>
           </>
            
           : <button style={{backgroundColor:"red", padding:"5px 10px",borderRadius:"10px,",border:"none"}} type="button" onClick={logout}>Logout</button> }
         
        
         
        </nav>
      </div>
    </header>
  );
}
