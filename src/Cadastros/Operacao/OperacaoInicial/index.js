import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import "./OperacaoInicial.css";
import MenuCadastros from "../../components/MenuCadastros";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const OperacaoInicial = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("OPERAÇÕES");
  const [operacoes, setOperacoes] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  useEffect(() => {
    const fetchOperacoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/operacao");
        if (!response.ok) {
          throw new Error("Erro ao buscar as operações do banco de dados.");
        }
        const operacoesData = await response.json();

        const operacoesMapeadas = operacoesData.map(operacao => ({
          ...operacao,
          tipo: operacao.tipo === 'E' ? 'Entrada' : operacao.tipo === 'S' ? 'Saída' : operacao.tipo
        }));

        const sortedOperacoes = operacoesMapeadas.sort((a, b) => a.operacao_id - b.operacao_id);
        setOperacoes(sortedOperacoes);
      } catch (error) {
        console.error("Erro ao buscar as operações:", error);
      }
    };

    fetchOperacoes();
  }, []);



  const handleEditClick = async (operacaoId) => {
    try {
      if (!operacaoId) {
        throw new Error("ID da operação não fornecido.");
      }

      const response = await fetch(`http://localhost:3000/api/v1/operacao/${operacaoId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes da operação.");
      }
      const operacaoData = await response.json();

      console.log("Detalhes da operação retornado:", operacaoData.descricao);
      console.log("ID:", operacaoId);

      navigate("/editaOperacao", { state: { operacaoData, operacaoId } });
    } catch (error) {
      console.error("Erro ao buscar os detalhes da operação:", error);
    }
  };

  return (
    <div>
      <Header />
      <MenuCadastros
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />
      <div className="table-operacao-container">
        <table id="tabela-operacoes">
          <thead>
            <tr>
              <th id="id-col">ID</th>
              <th id="descricao-col">DESCRIÇÃO</th>
              <th id="tipo-col">TIPO</th>
              <th id="editar-col">EDITAR</th>
            </tr>
          </thead>
          <tbody>
            {operacoes.map((operacao, index) => (
              <tr key={index}>
                <td>{operacao.operacao_id}</td>
                <td>{operacao.descricao}</td>
                <td>{operacao.tipo}</td>
                <td>
                  <button className="editar-button" onClick={() => handleEditClick(operacao.operacao_id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btNovo">
        <Link to="/cadastroOperacao">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
};

export default OperacaoInicial;
