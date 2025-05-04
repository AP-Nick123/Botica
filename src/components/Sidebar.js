import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../AuthContext"; 

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={`d-flex flex-column bg-dark text-white p-3 ${collapsed ? 'collapsed-sidebar' : ''}`} style={{ height: "100vh", width: collapsed ? "80px" : "240px", transition: "width 0.3s" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!collapsed && <h5 className="mb-0">BOTICA - ALANIA</h5>}
        <button className="btn btn-outline-light btn-sm" onClick={toggleSidebar}>
          <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>
      <hr />
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            <i className="fas fa-cogs"></i> {!collapsed && " Inventario"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ventas" className="nav-link text-white">
            <i className="fas fa-chart-line"></i> {!collapsed && " Ventas"}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/atencion" className="nav-link text-white">
            <i className="fas fa-headset"></i> {!collapsed && " Atención"}
          </Link>
        </li>
      </ul>
      <hr />
      <button className="btn btn-outline-danger w-100 mt-auto" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> {!collapsed && " Cerrar Sesión"}
      </button>
    </div>
  );
};

export default Sidebar;
