import React, { useState } from 'react';
import Header from "../Header";
import "./cadastroCliente.css";


const CadastroCliente = () => {
  const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("CLIENTES");
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');

  const handleButtonClick = (tela) => {
    setTelaCadastrosAberta(tela);
  };



  // REMOVE CARACTERES NÃO NUMÉRICOS E APLICA A MÁSCARA DO CPF
  const handleChangeCpf = (event) => {
    let value = event.target.value;
  
    value = value.replace(/\D/g, '');

    value = cpfMascara(value);
  
    setCpf(value);
  };


  const handleChangeRg = (event) => {
    let value = event.target.value;
    
    // Aplica a máscara de RG
    value = rgMask(value);
    
    // Atualiza o estado do RG
    setRg(value);
  };


  
  
  
  
  

  return (
    <div>
      <Header />
      <div className="botoes">
        {/* Use a variável telaCadastrosAberta para determinar a cor do botão CLIENTES */}
        <button className={telaCadastrosAberta === "CLIENTES" ? "selecionado" : ""} onClick={() => handleButtonClick("CLIENTES")}>CLIENTES</button>
        {/* Use a variável telaCadastrosAberta para determinar a cor do botão FORNECEDORES */}
        <button className={telaCadastrosAberta === "FORNECEDORES" ? "selecionado" : ""} onClick={() => handleButtonClick("FORNECEDORES")}>FORNECEDORES</button>
        {/* Use a variável telaCadastrosAberta para determinar a cor do botão OPERAÇÕES */}
        <button className={telaCadastrosAberta === "OPERAÇÕES" ? "selecionado" : ""} onClick={() => handleButtonClick("OPERAÇÕES")}>OPERAÇÕES</button>
      </div>

      <div className="formulario">
        <label htmlFor="nome">NOME</label>
        <input type="text" id="nome" name="nome" maxlength="60"/>

        <div className="cpf-rg-container">
          <div>
            <label className='lb1' htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" value={cpf} onChange={handleChangeCpf} maxLength="14"/>
          </div>
          <div>
            <label className='lb2' htmlFor="rg">RG</label>
            <input type="text" id="rg" name="rg" maxLength="10"/>
          </div>
        </div>

        <label htmlFor="endereco">ENDEREÇO</label>
        <input type="text" id="endereco" name="endereco" maxLength="60"/>

        <div className="localidade-container">
          <div>
            <label htmlFor="cidade">CIDADE</label>
            <input type="text" id="cidade" name="cidade" maxLength="40"/>
          </div>
          <div>
            <label htmlFor="uf">UF</label>
            <input type="text" id="uf" name="uf" maxLength="2"/>
          </div>
          <div>
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" name="cep" maxLength="9"/>
          </div>
        </div>

        <div className="contato-container">
          <div>
            <label htmlFor="telefone">TELEFONE</label>
            <input type="text" id="telefone" name="telefone" maxLength="16"/>
          </div>
          <div>
            <label htmlFor="email">E-MAIL</label>
            <input type="text" id="email" name="email" maxLength="60"/>
          </div>
        </div>
      </div>

      <div className='botoes-crud'>
        <div className='botoes-esquerda'>
          <button type="submit" name="btIncluir" id="btIncluir">INCLUIR</button>
          <button type="submit" name="btDeletar" id="btDeletar">DELETAR</button>
          <button type="submit" name="btAlterar" id="btAlterar">ALTERAR</button>
        </div>
        <div className='botoes-direita'>
          <button type="submit" name="btLimpar" id="btAlterar">LIMPAR</button>
          <button type="submit" name="btConsultar" id="btConsultar">CONSULTAR</button>
        </div>
      </div>
    </div>
  );
};


// MASCARA PARA CPF
export const cpfMascara = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};


// MASCARA PARA RG
const rgMask = value => {
  return value
    .replace(/[^\dX]/g, '')
    .replace(/^(\d{1,2})(\d{3})(\d{3})([\dX])$/, '$1.$2.$3-$4');
}




export default CadastroCliente;