import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import MenuCadastros from "../../components/MenuCadastros";


const CadastroOperacao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { operacaoData, operacaoId } = location.state || {};

  const [id, setId] = useState("");
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("OPERAÇÕES");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (operacaoData) {
      setId(operacaoId || "");
      setDescricao(operacaoData.descricao || "");
      setTipo(operacaoData.tipo || "");
    }
  }, [operacaoData, operacaoId]);

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  const verificarCamposObrigatorios = () => {
    if (!descricao.trim()) {
      return false;
    }
    if (!tipo.trim()) {
      return false;
    }
    return true;
  };

  const incluirOperacao = async () => {
    if (!verificarCamposObrigatorios()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const operacao = {
      descricao,
      tipo,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/operacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operacao),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Operação incluída com sucesso!");
        limparCampos();
      } else {
        if (result.error) {
          alert(result.error);
        } else {
          alert("Erro ao incluir operação. Verifique os dados e tente novamente.");
        }
        console.error("Erro ao incluir operação:", result);
      }
    } catch (error) {
      console.error("Erro ao incluir operação:", error);
      alert("Erro ao incluir operação. Tente novamente.");
    }
  };

  const limparCampos = () => {
    setDescricao("");
    setTipo("");
  };

  return (
    <div>
      <Header />
      <MenuCadastros
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />

      <div className="formulario">
        <label htmlFor="descricao">DESCRIÇÃO*</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          maxRows={4}
          style={{ resize: "none" }}
        />

        <div className="tipo">
          <label htmlFor="tipo">TIPO*</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="E">Entrada</option>
            <option value="S">Saída</option>
          </select>
        </div>
      </div>

      <div className="botoes-crud">
        <div className="botoes-esquerda">
          <button type="button" name="btIncluir" id="btIncluir" onClick={incluirOperacao}>
            INCLUIR
          </button>
        </div>
        <div className="botoes-direita">
          <button type="button" name="btLimpar" id="btLimpar" onClick={limparCampos}>
            LIMPAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastroOperacao;
