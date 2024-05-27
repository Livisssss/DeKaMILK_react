import React from "react";
import { Link } from "react-router-dom";
import "./MenuFinanceiro.css";

const MenuFinanceiro = ({ telaSelecionada, handleButtonClick }) => {
  return (
    <div className="botoes">
      <Link to="/financeiro">
        <button
          className={telaSelecionada === "PAGAR" ? "selecionado" : ""}
          onClick={() => handleButtonClick("PAGAR")}
        >
          PAGAR
        </button>
      </Link>
      <Link to="/financeiroReceber">
        <button
          className={telaSelecionada === "RECEBER" ? "selecionado" : ""}
          onClick={() => handleButtonClick("RECEBER")}
        >
          RECEBER
        </button>
      </Link>
    </div>
  );
};

export default MenuFinanceiro;
