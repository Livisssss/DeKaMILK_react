import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MenuCadastros.css";

const MenuCadastros = ({ telaSelecionada, handleButtonClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [nextPath, setNextPath] = useState("");
  const [nextTela, setNextTela] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handlePopupConfirmation = (confirmed) => {
    setShowPopup(false);
    if (confirmed) {
      handleButtonClick(nextTela);
      navigate(nextPath);
    }
  };

  const handleNavigation = (path, tela) => {
    const currentPath = location.pathname;
    const isCadastroPath =
      currentPath === "/cadastroCliente" ||
      currentPath === "/cadastroFornecedor" ||
      currentPath === "/cadastroOperacao";
    const isNavigatingToDifferentTela = telaSelecionada !== tela;

    if (isCadastroPath && isNavigatingToDifferentTela){
      setPopupMessage("Tem certeza que deseja sair? Seu registro será apagado.");
      setShowPopup(true);
      setNextPath(path);
      setNextTela(tela);
    } else if (isCadastroPath) {
      setPopupMessage("Tem certeza que deseja sair? Seu registro será apagado.");
      setShowPopup(true);
      setNextPath(path);
      setNextTela(tela);
    } else {
      handleButtonClick(tela);
      navigate(path);
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

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-navegation">
            <p>{popupMessage}</p>
            <button onClick={() => handlePopupConfirmation(true)}>SIM</button>
            <button onClick={() => handlePopupConfirmation(false)}>NÃO</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCadastros;
