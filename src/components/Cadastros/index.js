import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../Header";
import "./Cadastros.css";

const Cadastros = () => {
  // Defina o estado telaCadastrosAberta e a função setTelaCadastrosAberta usando o hook useState
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("CLIENTES");

  // Função para lidar com o clique nos botões
  const handleButtonClick = (tela) => {
    // Atualiza o estado telaCadastrosAberta para o valor correspondente ao botão clicado
    setTelaCadastrosAberta(tela);
  };

  return (
    <div>
      <Header />
      <div className="botoes">
        {/* Use a variável telaCadastrosAberta para determinar a cor do botão CLIENTES */}
        <button className={telaCadastrosAberta === "CLIENTES" ? "selecionado" : ""} onClick={() => handleButtonClick("CLIENTES")}>CLIENTES</button>
        {/* Use a variável telaCadastrosAberta para determinar a cor do botão FORNECEDORES */}
        <button className={telaCadastrosAberta === "FORNECEDORES" ? "selecionado" : ""} onClick={() => handleButtonClick("FORNECEDORES")}>FORNECEDORES</button>
        {/* Use a variável telaCadastrosAberta para determinar a cor do botão OPERAÇÕES */}
        <button className={telaCadastrosAberta === "OPERAÇÕES" ? "selecionado" : ""} onClick={() => handleButtonClick("OPERAÇÕES")}>OPERAÇÕES</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF</th>
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
            <td>Endereço 3</td>
            <td>Cidade 3</td>
            <td>UF 3</td>
            <td>45678-912</td>
            <td>(XX) XXXX-XXXX</td>
            <td>email3@example.com</td>
          </tr>
        </tbody>
      </table>

      {/* Botão Adicionar Clientes */}
      <div className="adicionarBT">
        <Link to="/cadastroCliente">
          <button>+</button>
        </Link>
      </div>
      </div>  
  );
};

export default Cadastros;
