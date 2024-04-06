import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Importe o arquivo de estilo aqui
import BarraLateral from "../BarraLateral";

const Header = () => {
  const navigate = useNavigate();
  const [barraLateralAberta, setBarraLateralAberta] = useState(false);

  const logout = () => {
    navigate("/");
  };

  const toggleBarraLateral = () => {
    setBarraLateralAberta(!barraLateralAberta);
  };

  return (
    <>
      <header className="header">
        <button onClick={toggleBarraLateral} className="btMenu">
          <img src="/imgs/menu_icon.png" alt="Menu" className="icon" />
        </button>
        <h1>
          DEKA<span>MILK</span>
        </h1>
        <button className="btSair" onClick={logout}>
          SAIR
        </button>
      </header>
      <div
        className={`conteudo ${barraLateralAberta ? "conteudo-movido" : ""}`}
      >
        {/* Conteúdo principal aqui */}
      </div>
      {barraLateralAberta && <BarraLateral />}
    </>
  );
};

export default Header;
