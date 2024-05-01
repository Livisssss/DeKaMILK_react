import React, { useState } from "react";
import Header from "../../../components/Header";
import "./CadastroOperacao.css";
import MenuCadastros from "../../components/MenuCadastros";

const CadastroOperacao = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("OPERAÇÕES");

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  return (
    <div>
      <Header />
      <MenuCadastros
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />
      <h1>Teste cacete CadastroOperacao</h1>
    </div>
  );
};

export default CadastroOperacao;
