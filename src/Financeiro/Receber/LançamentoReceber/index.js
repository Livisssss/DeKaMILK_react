import React, { useState } from "react";
import Header from "../../../components/Header";
import "./LançamentoReceber.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";

const LançamentoReceber = () => {
  const [telaCadastrosAberta, setTelaLançamentosAberta] = useState("RECEBER");
  const [operacao, setOperacao] = useState("");
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [valorReceber, setValorReceber] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleButtonClick = (tela) => {
    setTelaLançamentosAberta(tela);
  };

  // FUNÇÃO BOTÃO LIMPAR
  const limparCampos = () => {
    setOperacao("");
    setCliente("");
    setData("");
    setValorReceber("");
    setDescricao("");
  };

  return (
    <div>
      <Header />

      <MenuFinanceiro
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />

      <div className="formulario">
        <label htmlFor="operacao">OPERAÇÃO</label>
        <input
          type="text"
          id="operacao"
          value={operacao}
          onChange={(e) => setOperacao(e.target.value)}
          maxlength="60"
        />

        <label htmlFor="cliente">CLIENTE</label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <div className="data-valor-container">
          <div>
            <label className="lb1" htmlFor="data">
              DATA
            </label>
            <input
              type="data"
              id="data"
              name="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <label className="lb2-receber" htmlFor="valorReceber">
              VALOR A RECEBER
            </label>
            <input
              type="double"
              id="valorReceber"
              name="valorReceber"
              value={valorReceber}
              onChange={(e) => setValorReceber(e.target.value)}
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
          <button type="submit" name="btIncluir" id="btIncluir">
            INCLUIR
          </button>
          <button type="submit" name="btDeletar" id="btDeletar">
            DELETAR
          </button>
          <button type="submit" name="btAlterar" id="btAlterar">
            ALTERAR
          </button>
        </div>
        <div className="botoes-direita">
          <button
            type="submit"
            name="btLimpar"
            id="btLimpar"
            onClick={limparCampos}
          >
            LIMPAR
          </button>
          <button type="submit" name="btConsultar" id="btConsultar">
            CONSULTAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default LançamentoReceber;
