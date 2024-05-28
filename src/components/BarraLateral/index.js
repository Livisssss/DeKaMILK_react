import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./BarraLateral.css";

const BarraLateral = ({ aberta }) => {
  const menuItems = [
    { name: "home", label: "Home" },
    { name: "cadastro", label: "Cadastros" },
    { name: "financeiro", label: "Financeiro" },
    { name: "relatorio", label: "Relatório" },
    { name: "controle", label: "Controle" },
    { name: "seguranca", label: "Segurança" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(aberta);
  const location = useLocation();

  useEffect(() => {
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("overlay")) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("click", handleOverlayClick);
    } else {
      document.removeEventListener("click", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-container">
      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      />
      <ProSidebar className="sidebar" collapsed={!isSidebarOpen}>
        <Menu>
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(`/${item.name}`);
            return (
              <MenuItem
                key={item.name}
                className={`menu-item ${isActive ? "active" : ""}`}
              >
                <Link to={`/${item.name}`} className="menu-link">
                  <img
                    src={`/imgs/${item.name}_icon.png`}
                    alt={item.label}
                    className="menu-icon"
                  />
                  {aberta && <span>{item.label}</span>}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default BarraLateral;
