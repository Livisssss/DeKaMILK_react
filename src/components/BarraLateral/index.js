import React from "react";
import { Link } from "react-router-dom";
import "./BarraLateral.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const BarraLateral = ({ aberta }) => {
  return (
    <Sidebar className="sidebar" style={{ left: aberta ? "0" : "-200px" }}>
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

        <MenuItem className="menu-item">
          <img
            src="/imgs/relatorio_icon.png"
            alt="Relatório"
            className="menu-icon"
          />
          <Link to="/relatorio">Relatório</Link>
        </MenuItem>

        <MenuItem className="menu-item">
          <img
            src="/imgs/controle_icon.png"
            alt="Controle"
            className="menu-icon"
          />
          <Link to="/controle">Controle</Link>
        </MenuItem>

        <MenuItem className="menu-item">
          <img
            src="/imgs/seguranca_icon.png"
            alt="Segurança"
            className="menu-icon"
          />
          <Link to="/seguranca">Segurança</Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default BarraLateral;
