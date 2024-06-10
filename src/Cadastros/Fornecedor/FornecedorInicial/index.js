import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import "./FornecedorInicial.css";
import MenuCadastros from "../../components/MenuCadastros";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const FornecedorInicial = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("FORNECEDORES");
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/fornecedor");
        if (!response.ok) {
          throw new Error("Erro ao buscar os fornecedores do banco de dados.");
        }
        const fornecedoresData = await response.json();
        const sortedFornecedores = fornecedoresData.sort((a, b) => a.fornecedor_id - b.fornecedor_id);
        setFornecedores(sortedFornecedores);
      } catch (error) {
        console.error("Erro ao buscar os fornecedores:", error);
      }
    };

    fetchFornecedores();
  }, [])


  const handleEditClick = async (fornecedorId) => {
    try {
      if (!fornecedorId) {
        throw new Error("ID do fornecedor não fornecido.");
      }

      const response = await fetch(`http://localhost:3000/api/v1/fornecedor/${fornecedorId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do fornecedor.");
      }
      const fornecedorData = await response.json();

      console.log("Detalhes do fornecedor retornado:", fornecedorData.nome);
      console.log("ID:", fornecedorId);

      navigate("/editaFornecedor", { state: { fornecedorData, fornecedorId } });
    } catch (error) {
      console.error("Erro ao buscar os detalhes do fornecedor:", error);
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
            {fornecedores.map((fornecedor, index) => (
              <tr key={index}>
                <td>{fornecedor.fornecedor_id}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cpf}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.cidade}</td>
                <td>{fornecedor.uf}</td>
                <td>{fornecedor.cep}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <button className="editar-button" onClick={() => handleEditClick(fornecedor.fornecedor_id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btNovo">
        <Link to="/cadastroFornecedor">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
};

export default FornecedorInicial;