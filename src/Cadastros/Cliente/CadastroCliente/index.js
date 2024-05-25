import React, { useState } from "react";
import Header from "../../../components/Header";
import "./cadastroCliente.css";
import MenuCadastros from "../../components/MenuCadastros";

const CadastroCliente = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("CLIENTES");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [email, setEmail] = useState("");

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  // APLICA A MASCARA CPF E ATUALIZA O INPUT
  const handleChangeCpf = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = cpfMascara(value);

    setCpf(value);
  };

  // APLICA A MASCARA RG E ATUALIZA O INPUT
  const handleChangeRg = (event) => {
    let value = event.target.value;
    value = rgMascara(value);

    setRg(value);
  };

  // APLICA A MASCARA UF E ATUALIZA O INPUT
  const handleChangeUf = (event) => {
    let value = event.target.value;
    // Aplica a máscara
    value = ufMascara(value);

    setUf(value);
  };

  // APLICA A MASCARA CEP E ATUALIZA O INPUT
  const handleChangeCep = (event) => {
    let value = event.target.value;
    value = cepMascara(value);

    setCep(value);
  };

  // APLICA A MASCARA DE TELEFONE E ATUALIZA O INPUT
  const handleChangeTelefone = (event) => {
    let value = event.target.value;
    value = telefoneMascara(value);

    setTelefone(value);
  };

  // FUNÇÃO BOTÃO LIMPAR
  const limparCampos = () => {
    setNome("");
    setCpf("");
    setRg("");
    setEndereco("");
    setCidade("");
    setUf("");
    setCep("");
    setTelefone("");
    setEmail("");
    setCidade("");
  };

  return (
    <div>
      <Header />

      <MenuCadastros
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />

      <div className="formulario">
        <label htmlFor="nome">NOME</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          maxlength="60"
        />

        <div className="cpf-rg-container">
          <div>
            <label className="lb1" htmlFor="cpf">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={handleChangeCpf}
              maxLength="14"
            />
          </div>
          <div>
            <label className="lb2" htmlFor="rg">
              RG
            </label>
            <input
              type="text"
              id="rg"
              name="rg"
              value={rg}
              onChange={handleChangeRg}
              maxLength="10"
            />
          </div>
        </div>

        <label htmlFor="endereco">ENDEREÇO</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          maxLength="60"
        />

        <div className="localidade-container">
          <div>
            <label htmlFor="cidade">CIDADE</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              maxLength="30"
            />
          </div>
          <div>
            <label htmlFor="uf">UF</label>
            <input
              type="text"
              id="uf"
              name="uf"
              value={uf}
              onChange={(event) => handleChangeUf(event)}
              maxLength="2"
            />
          </div>
          <div>
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={cep}
              onChange={(event) => handleChangeCep(event)}
              maxLength="9"
            />
          </div>
        </div>

        <div className="contato-container">
          <div>
            <label htmlFor="telefone">TELEFONE</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={telefone}
              onChange={(event) => handleChangeTelefone(event)}
              maxLength="16"
            />
          </div>
          <div>
            <label htmlFor="email">E-MAIL</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength="60"
            />
          </div>
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

// MÁSCARA PARA CPF
export const cpfMascara = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

// MÁSCARA PARA RG
export const rgMascara = (value) => {
  const formattedValue = value.replace(/\D/g, "");

  return formattedValue.slice(0, 10);
};

// MÁSCARA UF
export const ufMascara = (value) => {
  value = value.replace(/[^A-Za-z]/g, "");
  value = value.toUpperCase();

  return value;
};

// MÁSCARA CEP
export const cepMascara = (value) => {
  const formattedValue = value.replace(/\D/g, "");

  return formattedValue.length > 5
    ? formattedValue.replace(/^(\d{5})(\d{1,3})$/, "$1-$2")
    : formattedValue;
};

// MÁSCARA TELEFONE
export const telefoneMascara = (value) => {
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length <= 2) {
    return digitsOnly;
  }

  const ddd = digitsOnly.substring(0, 2);
  const prefixo = digitsOnly.substring(2, 3);
  const sufixo1 = digitsOnly.substring(3, 7);
  const sufixo2 = digitsOnly.substring(7);

  let formattedValue = "";

  if (ddd) {
    formattedValue += `(${ddd})`;
  }

  if (prefixo) {
    formattedValue += ` ${prefixo}`;
  }

  if (sufixo1) {
    formattedValue += ` ${sufixo1}`;
  }

  if (sufixo2) {
    formattedValue += `-${sufixo2}`;
  }

  return formattedValue.trim();
};

export default CadastroCliente;
