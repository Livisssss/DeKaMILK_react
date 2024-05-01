import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import "./OperacaoInicial.css";
import MenuCadastros from "../../components/MenuCadastros";

const OperacaoInicial = () => {
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

      <table>
        <thead>
          <tr>
            <th>DESCRIÇÃO</th>
            <th>TIPO</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Compra de Vacinas</td>
            <td>SAÍDA</td>
          </tr>
          <tr>
            <td>Venda de Leite</td>
            <td>ENTRADA</td>
          </tr>
          <tr>
            <td>Compra de Ração</td>
            <td>SAÍDA</td>
          </tr>
        </tbody>
      </table>
      <div className="btAdicionar">
        <Link to="/cadastroOperacao">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
};

export default OperacaoInicial;
