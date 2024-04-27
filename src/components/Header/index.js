import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import BarraLateral from "../BarraLateral";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const toggleSidebar = () => {
    setSidebarAberta(!sidebarAberta);
  };

  const logout = () => {
    navigate("/");
  };

  if (location.pathname !== "/") {
    return (
      <>
        <header className="header">
          <button className="btMenu" onClick={toggleSidebar}>
            <img src="/imgs/menu_icon.png" alt="Menu" className="icon" />
          </button>
          <h1>
            DEKA<span>MILK</span>
          </h1>
          <button className="btSair" onClick={logout}>
            SAIR
          </button>
        </header>
        {sidebarAberta && (
          <div className="overlay" onClick={toggleSidebar}></div>
        )}
        <BarraLateral aberta={sidebarAberta} />
      </>
    );
  } else {
    return null;
  }
};

export default Header;
