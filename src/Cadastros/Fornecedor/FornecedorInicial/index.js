import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import "./FornecedorInicial.css";
import MenuCadastros from "../../components/MenuCadastros";

const FornecedorInicial = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] =
    useState("FORNECEDORES");

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
            <th>NOME</th>
            <th>CPF/CNPJ</th>
            <th>INS. ESTADUAL</th>
            <th>ENDEREÇO</th>
            <th>CIDADE</th>
            <th>UF</th>
            <th>CEP</th>
            <th>TELEFONE</th>
            <th>E-MAIL</th>
            <th>EDITAR</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Nome 2</td>
            <td>987.654.321-00</td>
            <td>152152309</td>
            <td>Endereço 2</td>
            <td>Cidade 2</td>
            <td>UF 2</td>
            <td>98765-432</td>
            <td>(XX) XXXX-XXXX</td>
            <td>email2@example.com</td>
          </tr>
          <tr>
            <td>Nome 3</td>
            <td>456.789.123-00</td>
            <td>152152309</td>
            <td>Endereço 3</td>
            <td>Cidade 3</td>
            <td>UF 3</td>
            <td>45678-912</td>
            <td>(XX) XXXX-XXXX</td>
            <td>email3@example.com</td>
          </tr>
        </tbody>
      </table>
      <div className="btAdicionar">
        <Link to="/cadastroFornecedor">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
};

export default FornecedorInicial;
