import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  function signOut() {
    alert("user signed out");
    localStorage.removeItem("_id");
    navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="navbarRight">
        <h2>Threads</h2>
        <button onClick={signOut}>sign out</button>
      </div>
    </nav>
  );
}

export default Nav;
