import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./Login";
import Home from "./Home";
import CadastroClienteInicial from "./Cadastros/Cliente/ClienteInicial";
import CadastroCliente from "./Cadastros/Cliente/CadastroCliente";
import CadastroFornecedorInicial from "./Cadastros/Fornecedor/FornecedorInicial";
import CadastroFornecedor from "./Cadastros/Fornecedor/CadastroFornecedor";
import CadastroOperacaoInicial from "./Cadastros/Operacao/OperacaoInicial";
import CadastroOperacao from "./Cadastros/Operacao/CadastroOperacao";
import Financeiro from "./Financeiro/Pagar/LançamentoPagar";
import FinanceiroReceber from "./Financeiro/Receber/LançamentoReceber";
import Seguranca from "./Segurança"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Header />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<CadastroClienteInicial />} />
        <Route path="/cadastroCliente" element={<CadastroCliente />} />
        <Route path="/cadastroFornecedorInicial" element={<CadastroFornecedorInicial />} />
        <Route path="/cadastroFornecedor" element={<CadastroFornecedor />} />
        <Route path="/cadastroOperacaoInicial" element={<CadastroOperacaoInicial />} />
        <Route path="/cadastroOperacao" element={<CadastroOperacao />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/financeiroReceber" element={<FinanceiroReceber />} />
        <Route path="seguranca" element={<Seguranca />} />
      </Routes>
    </Router>
  );
};

export default App;
