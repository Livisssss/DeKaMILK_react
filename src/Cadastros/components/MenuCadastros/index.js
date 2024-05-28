import React from "react";
import { Link } from "react-router-dom";
import "./MenuCadastros.css";

const MenuCadastros = ({ telaSelecionada, handleButtonClick }) => {
  return (
    <div className="botoes">
      <Link to="/cadastro">
        <button
          className={telaSelecionada === "CLIENTES" ? "selecionado" : ""}
          onClick={() => handleButtonClick("CLIENTES")}
        >
          CLIENTES
        </button>
      </Link>
      <Link to="/cadastroFornecedorInicial">
        <button
          className={telaSelecionada === "FORNECEDORES" ? "selecionado" : ""}
          onClick={() => handleButtonClick("FORNECEDORES")}
        >
          FORNECEDORES
        </button>
      </Link>
      <Link to="/cadastroOperacaoInicial">
        <button
          className={telaSelecionada === "OPERAÇÕES" ? "selecionado" : ""}
          onClick={() => handleButtonClick("OPERAÇÕES")}
        >
          OPERAÇÕES
        </button>
      </Link>
    </div>
  );
};

export default MenuCadastros;
