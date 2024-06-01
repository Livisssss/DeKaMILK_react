import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import "./ClienteInicial.css";
import MenuCadastros from "../../components/MenuCadastros";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const ClienteInicial = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("CLIENTES");
  const [clientes, setClientes] = useState([]);

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/cliente");
        if (!response.ok) {
          throw new Error("Erro ao buscar os clientes do banco de dados.");
        }
        const clientesData = await response.json();
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  
  return (
    <div>
      <Header />
      <MenuCadastros
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />
      <div className="table-container">
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
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.uf}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                  <button className="editar-button" data-cliente-id={cliente.id}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btAdicionar">
        <Link to="/cadastroCliente">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
};

export default ClienteInicial;
