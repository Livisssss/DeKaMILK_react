import React, { useState } from "react";
import Header from "../../../components/Header";
import "./LançamentoPagar.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";

const LançamentoPagar = () => {
  const [telaCadastrosAberta, setTelaLançamentosAberta] = useState("PAGAR");
  const [operacao, setOperacao] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [data, setData] = useState("");
  const [valorPagar, setValorPagar] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleButtonClick = (tela) => {
    setTelaLançamentosAberta(tela);
  };

  // FUNÇÃO BOTÃO LIMPAR
  const limparCampos = () => {
    setOperacao("");
    setFornecedor("");
    setData("");
    setValorPagar("");
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

        <label htmlFor="fornecedor">FORNECEDOR</label>
        <input
          type="text"
          id="fornecedor"
          name="fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
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
            <label className="lb2-pagar" htmlFor="valorPagar">
              VALOR A PAGAR
            </label>
            <input
              type="double"
              id="valorPagar"
              name="valorPagar"
              value={valorPagar}
              onChange={(e) => setValorPagar(e.target.value)}
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

export default LançamentoPagar;
