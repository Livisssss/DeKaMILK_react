import React from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./BarraLateral.css";

const BarraLateral = ({ aberta }) => {
  return (
    <div className="sidebar-container">
      {aberta && <div className="overlay" />}
      <ProSidebar className="sidebar" collapsed={!aberta}>
        <Menu>
          <MenuItem className="menu-item">
            <Link to="/home">
              <img src="/imgs/home_icon.png" alt="Home" className="menu-icon" />
              {aberta && <span>Home</span>}
            </Link>
          </MenuItem>

          <MenuItem className="menu-item">
            <Link to="/clienteInicial">
              <img
                src="/imgs/cadastros_icon.png"
                alt="Cadastros"
                className="menu-icon"
              />
              {aberta && <span>Cadastros</span>}
            </Link>
          </MenuItem>

          <MenuItem className="menu-item">
            <Link to="/financeiro">
              <img
                src="/imgs/financeiro_icon.png"
                alt="Financeiro"
                className="menu-icon"
              />
              {aberta && <span>Financeiro</span>}
            </Link>
          </MenuItem>

          <MenuItem className="menu-item">
            <Link to="/relatorio">
              <img
                src="/imgs/relatorio_icon.png"
                alt="Relatório"
                className="menu-icon"
              />
              {aberta && <span>Relatório</span>}
            </Link>
          </MenuItem>

          <MenuItem className="menu-item">
            <Link to="/controle">
              <img
                src="/imgs/controle_icon.png"
                alt="Controle"
                className="menu-icon"
              />
              {aberta && <span>Controle</span>}
            </Link>
          </MenuItem>

          <MenuItem className="menu-item">
            <Link to="/seguranca">
              <img
                src="/imgs/seguranca_icon.png"
                alt="Segurança"
                className="menu-icon"
              />
              {aberta && <span>Segurança</span>}
            </Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default BarraLateral;
