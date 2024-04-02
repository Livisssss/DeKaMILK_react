import React from "react";
import { Link } from "react-router-dom";
import "./BarraLateral.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const BarraLateral = () => {
  return (
    <Sidebar className="sidebar">
      <Menu>
        <MenuItem className="menu-item">
          <img src="/imgs/home_icon.png" alt="Home" className="menu-icon" />
          <Link to="/home">Home</Link>
        </MenuItem>

        <MenuItem className="menu-item">
          <img
            src="/imgs/cadastros_icon.png"
            alt="Cadastros"
            className="menu-icon"
          />
          <Link to="/cadastros">Cadastros</Link>
        </MenuItem>

        <MenuItem className="menu-item">
          <img
            src="/imgs/financeiro_icon.png"
            alt="Financeiro"
            className="menu-icon"
          />
          <Link to="/financeiro">Financeiro</Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default BarraLateral;
