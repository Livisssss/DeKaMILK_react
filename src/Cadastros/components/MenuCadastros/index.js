import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MenuCadastros.css";

const MenuCadastros = ({ telaSelecionada, handleButtonClick }) => {
  const [nextPath, setNextPath] = useState("");
  const [nextTela, setNextTela] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, tela) => {
    const currentPath = location.pathname;
    const isCadastroPath =
      currentPath === "/cadastroCliente" ||
      currentPath === "/editaCliente" ||
      currentPath === "/cadastroFornecedor" ||
      currentPath === "/cadastroOperacao" ||
      currentPath === "/editaFornecedor" ||
      currentPath === "/cadastroFornecedorInicial";
    const isNavigatingToDifferentTela = telaSelecionada !== tela;

    if (isCadastroPath && isNavigatingToDifferentTela) {
      const confirmation = window.confirm(
        "Tem certeza que deseja sair? Seu registro será apagado."
      );
      if (confirmation) {
        navigate(path);
        handleButtonClick(tela);
      }
    } else if (isCadastroPath) {
      const confirmation = window.confirm(
        "Tem certeza que deseja sair? Seu registro será apagado."
      );
      if (confirmation) {
        navigate(path);
        handleButtonClick(tela);
      }
    } else {
      navigate(path);
      handleButtonClick(tela);
    }
  };

  return (
    <div className="botoes">
      <button
        className={telaSelecionada === "CLIENTES" ? "selecionado" : ""}
        onClick={() => handleNavigation("/cadastro", "CLIENTES")}
      >
        CLIENTES
      </button>

      <button
        className={telaSelecionada === "FORNECEDORES" ? "selecionado" : ""}
        onClick={() => handleNavigation("/cadastroFornecedorInicial", "FORNECEDORES")}
      >
        FORNECEDORES
      </button>

      <button
        className={telaSelecionada === "OPERAÇÕES" ? "selecionado" : ""}
        onClick={() => handleNavigation("/cadastroOperacaoInicial", "OPERAÇÕES")}
      >
        OPERAÇÕES
      </button>
    </div>
  );
};

export default MenuCadastros;
