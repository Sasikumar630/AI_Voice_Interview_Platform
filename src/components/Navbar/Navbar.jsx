import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {

        try {

            await logout();

            alert("Logged out successfully!");

            setMenuOpen(false);

            navigate("/login");

        } catch (error) {

            console.error(error);
            alert("Failed to logout.");

        }

    };

    return (

       <>
  <nav className="navbar">
    <div className="logo">
      <h2>AI Voice Interview Prep</h2>
    </div>

    {/* Desktop Menu */}
    <div className="desktop-menu">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/tips">Interview Tips</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>

    {/* Desktop Buttons */}
    <div className="desktop-buttons">
      {currentUser ? (
        <>
          <span className="user-email">
            👤 {currentUser.email}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="login-btn">
            Login
          </NavLink>

          <NavLink to="/register" className="register-btn">
            Register
          </NavLink>
        </>
      )}
    </div>

    {/* Mobile Menu Icon */}
    <div
      className="menu-icon"
      onClick={() => setMenuOpen(true)}
    >
      <FaBars />
    </div>
  </nav>

  {/* Overlay */}
  {menuOpen && (
    <div
      className="overlay"
      onClick={() => setMenuOpen(false)}
    />
  )}

  {/* Sidebar */}
  <div className={`sidebar ${menuOpen ? "open" : ""}`}>

    <div className="sidebar-top">

      <FaTimes
        className="close"
        onClick={() => setMenuOpen(false)}
      />

      {currentUser && (
        <>
          <h3>👤 User</h3>
          <p>{currentUser.email}</p>
        </>
      )}

    </div>

    <NavLink to="/" onClick={() => setMenuOpen(false)}>
      🏠 Home
    </NavLink>

    <NavLink
      to="/categories"
      onClick={() => setMenuOpen(false)}
    >
      📂 Categories
    </NavLink>

    <NavLink
      to="/tips"
      onClick={() => setMenuOpen(false)}
    >
      💡 Interview Tips
    </NavLink>

    <NavLink
      to="/about"
      onClick={() => setMenuOpen(false)}
    >
      ℹ️ About
    </NavLink>

    {currentUser ? (
      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        🚪 Logout 
      </button>
    ) : (
      <>
        <NavLink
          to="/login"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          onClick={() => setMenuOpen(false)}
        >
          Register
        </NavLink>
      </>
    )}

  </div>
</>
    );

}

export default Navbar;