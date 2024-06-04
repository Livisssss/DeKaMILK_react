import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
import "./EditaCliente.css";
import MenuCadastros from "../../components/MenuCadastros";

const EditaCliente = () => {
  const location = useLocation();
  const { clienteData } = location.state || {};

  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("CLIENTES");
  const [nome, setNome] = useState(clienteData ? clienteData.nome : "");
  const [cpf, setCpf] = useState(clienteData ? clienteData.cpf : "");
  const [cnpj, setCnpj] = useState(clienteData ? clienteData.cnpj : "");
  const [uf, setUf] = useState(clienteData ? clienteData.uf : "");
  const [cep, setCep] = useState(clienteData ? clienteData.cep : "");
  const [telefone, setTelefone] = useState(clienteData ? clienteData.telefone : "");
  const [endereco, setEndereco] = useState(clienteData ? clienteData.endereco : "");
  const [cidade, setCidade] = useState(clienteData ? clienteData.cidade : "");
  const [email, setEmail] = useState(clienteData ? clienteData.email : "");
  const [tipoPessoa, setTipoPessoa] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (clienteData) {
      setNome(clienteData.nome);
      setCpf(clienteData.cpf);
      setCnpj(clienteData.cnpj);
      setUf(clienteData.uf);
      setCep(clienteData.cep);
      setTelefone(clienteData.telefone);
      setEndereco(clienteData.endereco);
      setCidade(clienteData.cidade);
      setEmail(clienteData.email);
      const tipoPessoa = clienteData.cpf ? "Física" : clienteData.cnpj ? "Jurídica" : null;
      setTipoPessoa(tipoPessoa);
    }
  }, [clienteData]);

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };

  const handleChangeCpf = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    value = cpfMascara(value);
    setCpf(value);
  };

  const handleChangeCnpj = (event) => {
    let value = event.target.value;
    value = cnpjMascara(value);
    setCnpj(value);
  };

  const handleChangeUf = (event) => {
    let value = event.target.value;
    value = ufMascara(value);
    setUf(value);
  };

  const handleChangeCep = (event) => {
    let value = event.target.value;
    value = cepMascara(value);
    setCep(value);
  };

  const handleChangeTelefone = (event) => {
    let value = event.target.value;
    value = telefoneMascara(value);
    setTelefone(value);
  };

  const verificarCamposObrigatorios = () => {
    if (tipoPessoa === "fisica") {
      return nome && telefone && email && cpf && cpf.length === 14;
    } else if (tipoPessoa === "juridica") {
      return nome && telefone && email && cnpj && cnpj.length === 18;
    } else {
      return false; // Se o tipo de pessoa for nulo, retorna falso
    }
  };

  const handleTipoPessoaChange = (newTipoPessoa) => {
    setTipoPessoa(newTipoPessoa);
    if (newTipoPessoa === "fisica") {
      setCnpj(""); // Limpa o CNPJ ao selecionar Pessoa Física
    } else {
      setCpf(""); // Limpa o CPF ao selecionar Pessoa Jurídica
    }
  };
   // FUNÇÃO PARA FECHAR POPUP
   const fecharPopup = () => {
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };
   // FECHA O POP UP COM A TECLA ESC
   useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27 && showPopup) {
        fecharPopup();
      }
    };
  });

  const limparCampos = () => {
    setNome("");
    setCpf("");
    setCnpj("");
    setEndereco("");
    setCidade("");
    setUf("");
    setCep("");
    setTelefone("");
    setEmail("");
    setTipoPessoa("null");
  };

  const incluirCliente = async () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!verificarCamposObrigatorios()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verifica se os campos com máscara estão preenchidos corretamente
    if (tipoPessoa === "fisica") {
      if (!cpf || cpf.length !== 14) {
        alert("Por favor, preencha o CPF corretamente.");
        return;
      }
    } else if (tipoPessoa === "juridica") {
      if (!cnpj || cnpj.length !== 18) {
        alert("Por favor, preencha o CNPJ corretamente.");
        return;
      }
    }

    if (!cep || cep.length !== 9) {
      alert("Por favor, preencha o CEP corretamente.");
      return;
    }

    if (!telefone || telefone.length !== 16) {
      alert("Por favor, preencha o telefone corretamente.");
      return;
    }

    // Agora envia os dados para o servidor
    const cliente = {
      nome,
      cpf: tipoPessoa === "fisica" ? cpf : undefined, // Só envia CPF se for pessoa física
      cnpj: tipoPessoa === "juridica" ? cnpj : undefined, // Só envia CNPJ se for pessoa jurídica
      endereco,
      cidade,
      uf,
      cep,
      telefone,
      email,
    };

    console.log("Enviando cliente:", cliente);

    try {
      const response = await fetch("http://localhost:3000/api/v1/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      const result = await response.json();

      if (response.ok) {
        limparCampos();
      } else if (response.status === 422) {
        console.error("Erro de validação:", result);
        if (result.error === 'Já existe um cliente cadastrado com este CPF.') {
          alert("Já existe um cliente cadastrado com este CPF.");
          setCpf(""); // Limpa o campo CPF
        } else if (result.error === 'Já existe um cliente cadastrado com este CNPJ.') {
          alert("Já existe um cliente cadastrado com este CNPJ.");
          setCnpj(""); // Limpa o campo CNPJ
        } else {
          alert("Erro ao incluir cliente. Verifique os dados e tente novamente.");
        }
      } else {
        console.error("Erro inesperado:", result);
        alert("Erro ao incluir cliente. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao incluir cliente:", error);
      alert("Erro ao incluir cliente. Tente novamente.");
    }
  };

  return (
    <div>
      <Header />
      <MenuCadastros
        telaSelecionada={telaCadastrosAberta}
        handleButtonClick={handleButtonClick}
      />
      <div className="formulario">
        <label htmlFor="nome">NOME*</label>
        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength="60" />

        <div className="radio-buttons">
          <div className="radio-button-container">
            <input type="radio" value="fisica" name="tipoPessoa" checked={tipoPessoa === "fisica"} onChange={() => handleTipoPessoaChange("fisica")} />
            <label>Pessoa Física</label>
          </div>
          <div className="radio-button-container">
            <input type="radio" value="juridica" name="tipoPessoa" checked={tipoPessoa === "juridica"} onChange={() => handleTipoPessoaChange("juridica")} />
            <label>Pessoa Jurídica</label>
          </div>
        </div>

        <div className="cpf-cnpj-container">
          <div>
            <label htmlFor="cpf">CPF*</label>
            <input type="text" id="cpf" name="cpf" value={cpf} onChange={handleChangeCpf} maxLength="14" disabled={tipoPessoa !== "fisica"} />
          </div>
          <div>
            <label htmlFor="cnpj">CNPJ*</label>
            <input type="text" id="cnpj" name="cnpj" value={cnpj} onChange={handleChangeCnpj} maxLength="18" disabled={tipoPessoa !== "juridica"} />
          </div>
        </div>
        <label htmlFor="endereco">ENDEREÇO</label>
        <input type="text" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} maxLength="60" />
        <div className="localidade-container">
          <div>
            <label htmlFor="cidade">CIDADE</label>
            <input type="text" id="cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} maxLength="30" />
          </div>
          <div>
            <label htmlFor="uf">UF</label>
            <input type="text" id="uf" name="uf" value={uf} onChange={(event) => handleChangeUf(event)} maxLength="2" />
          </div>
          <div>
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" name="cep" value={cep} onChange={(event) => handleChangeCep(event)} maxLength="9" />
          </div>
        </div>
        <div className="contato-container">
          <div>
            <label htmlFor="telefone">TELEFONE*</label>
            <input type="text" id="telefone" name="telefone" value={telefone} onChange={(event) => handleChangeTelefone(event)} maxLength="16" />
          </div>
          <div>
            <label htmlFor="email">E-MAIL*</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength="60" />
          </div>
        </div>
      </div>
      <div className="botoes-crud">
        <div className="botoes-esquerda">
          <button type="button" name="btIncluir" id="btIncluir" onClick={incluirCliente}>INCLUIR</button>
          <button type="button" name="btDeletar" id="btDeletar">DELETAR</button>
        </div>
        <div className="botoes-direita">
          <button type="button" name="btLimpar" id="btLimpar" onClick={limparCampos}>LIMPAR</button>
        </div>
      </div>

      {showPopup && (
      <div className="popup-overlay">
        <div className="popup-clientes">
          <p>Por favor, preencha todos os campos obrigatórios.</p>
          <button onClick={fecharPopup}>Fechar</button>
        </div>
      </div>
    )}

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

// MÁSCARA PARA CNPJ
export const cnpjMascara = (value) => {
  const formattedValue = value.replace(/\D/g, "");

  return formattedValue
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
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
export default EditaCliente;