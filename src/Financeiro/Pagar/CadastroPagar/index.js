import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import "./CadastroPagar.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";
import axios from 'axios';

const CadastroPagar = () => {
  const [telaCadastrosAberta, setTelaLançamentosAberta] = useState("PAGAR");
  const [operacao, setOperacao] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [data, setData] = useState("");
  const [valorPagar, setValorPagar] = useState("");
  const [descricao, setDescricao] = useState("");
  const [operacoes, setOperacoes] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [cliente, setCliente] = useState(""); // Exemplo de estado de cliente

  const handleButtonClick = (tela) => {
    setTelaLançamentosAberta(tela);
  };

  const formatarData = (input) => {
    let value = input.replace(/\D/g, '');
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    return value;
  };

  const handleChangeData = (e) => {
    const formattedValue = formatarData(e.target.value);
    setData(formattedValue);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/movimento')
      .then(response => {
        setOperacoes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar operações:', error);
      });

    axios.get('http://localhost:3000/api/v1/fornecedor')
      .then(response => {
        setFornecedores(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar fornecedores:', error);
      });
  }, []);

  const limparCampos = () => {
    setOperacao("");
    setFornecedor("");
    setData("");
    setValorPagar("");
    setDescricao("");
  };

  const formatarDinheiro = (value) => {
    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Formata para adicionar ponto decimal e vírgula de milhar
    value = (value / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    // Adiciona o símbolo de moeda "R$"
    return `R$ ${value}`;
  };

  const handleChangeValorPagar = (e) => {
    const formattedValue = formatarDinheiro(e.target.value);
    setValorPagar(formattedValue);
  };

  const handleIncluir = async () => {
    try {
      // Remova formatação do valor para enviar apenas o número
      const valorSemFormatacao = valorPagar.replace(/[^\d]/g, '');

      const response = await axios.post('http://localhost:3000/api/v1/movimento', {
        operacao_id: operacao,
        fornecedor_id: fornecedor,
        cliente_id: cliente, // Utilização do estado de cliente
        data_lancamento: data,
        valor: valorSemFormatacao,
        descricao: descricao
      });

      console.log('Movimento incluído com sucesso:', response.data);
      limparCampos(); // Limpa os campos após a inclusão bem-sucedida

      // Exemplo: Redirecionar o usuário para outra página após inclusão
      // history.push('/movimentos');

    } catch (error) {
      if (error.response) {
        // O servidor retornou um status de erro
        console.error('Erro ao incluir movimento:', error.response.data);
        // Exemplo: Exibir mensagem de erro ao usuário
        // setErrorMsg(error.response.data.message);
      } else if (error.request) {
        // A requisição foi feita, mas não recebeu resposta
        console.error('Erro na requisição:', error.request);
      } else {
        // Ocorreu um erro ao configurar a requisição
        console.error('Erro ao configurar a requisição:', error.message);
      }
    }
  };





  return (
    <div>
      <Header />
      <MenuFinanceiro
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />

      <div className="formulario">
        <label htmlFor="operacao">OPERAÇÃO*</label>
        <select id="operacao" value={operacao} onChange={(e) => setOperacao(e.target.value)}>
          <option value="">Selecione uma operação...</option>
          {operacoes.map(op => (
            <option key={op.operacao_id} value={op.operacao_id}>{op.descricao}</option>
          ))}
        </select>

        <label htmlFor="fornecedor">FORNECEDOR*</label>
        <select id="fornecedor" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)}>
          <option value="">Selecione um fornecedor...</option>
          {fornecedores.map(fornecedor => (
            <option key={fornecedor.fornecedor_id} value={fornecedor.fornecedor_id}>{fornecedor.nome}</option>
          ))}
        </select>

        <div className="data-valor-container">
          <div>
            <label className="lb1" htmlFor="data">DATA</label>
            <input type="text" id="data" name="data" value={data} onChange={(e) => handleChangeData(e)} maxLength="10" />
          </div>
          <div>
            <label className="lb2-pagar" htmlFor="valorPagar">VALOR A PAGAR*</label>
            <input
              type="text"
              id="valorPagar"
              name="valorPagar"
              value={valorPagar}
              onChange={(e) => handleChangeValorPagar(e)}
            />
          </div>
        </div>

        <div className="descricao-container">
          <label htmlFor="descricao">DESCRIÇÃO</label>
          <textarea
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            maxLength="500"
          />
        </div>
      </div>

      <div className="botoes-crud">
        <div className="botoes-esquerda">
          <button type="button" name="btIncluir" id="btIncluir" onClick={handleIncluir}>
            INCLUIR
          </button>
        </div>
        <div className="botoes-direita">
          <button type="button" name="btLimpar" id="btLimpar" onClick={limparCampos}>LIMPAR</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroPagar;
