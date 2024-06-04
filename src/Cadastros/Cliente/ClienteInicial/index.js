import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import "./ClienteInicial.css";
import MenuCadastros from "../../components/MenuCadastros";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const ClienteInicial = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("CLIENTES");
  const [clientes, setClientes] = useState([]);
  const [clienteEditData, setClienteEditData] = useState(null); // Estado para os dados do cliente a serem editados
  const navigate = useNavigate();

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
        // Trate o erro aqui, por exemplo, exibindo uma mensagem para o usuário
      }
    };

    fetchClientes();
  }, []);

  const handleEditClick = async (clienteId, cliente) => {
    try {
      if (!clienteId) {
        throw new Error("ID do cliente não fornecido.");
      }
  
      const response = await fetch(`http://localhost:3000/api/v1/cliente/${clienteId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do cliente.");
      }
      const clienteData = await response.json();
  
      console.log("Detalhes do cliente retornado:", clienteData.nome);
  
      navigate("/editaCliente", { state: { clienteData } });
    } catch (error) {
      console.error("Erro ao buscar os detalhes do cliente:", error);
      // Trate o erro aqui, por exemplo, exibindo uma mensagem para o usuário
    }
  };
  

  
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
              <th>ID</th>
              <th>NOME</th>
              <th>CPF</th>
              <th>CNPJ</th>
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
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.cliente_id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.cnpj}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.uf}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                  <button className="editar-button" onClick={() => handleEditClick(cliente.cliente_id, cliente)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btNovo">
        <Link to="/cadastroCliente">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
};

export default ClienteInicial;
