import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./Login";
import Home from "./Home";
import CadastroClienteInicial from "./Cadastros/Cliente/ClienteInicial";
import CadastroCliente from "./Cadastros/Cliente/CadastroCliente";
import EditaCliente from "./Cadastros/Cliente/EditaCliente";
import CadastroFornecedorInicial from "./Cadastros/Fornecedor/FornecedorInicial";
import CadastroFornecedor from "./Cadastros/Fornecedor/CadastroFornecedor";
import CadastroOperacaoInicial from "./Cadastros/Operacao/OperacaoInicial";
import CadastroOperacao from "./Cadastros/Operacao/CadastroOperacao";
import Financeiro from "./Financeiro/Pagar/LançamentoPagar";
import FinanceiroReceber from "./Financeiro/Receber/LançamentoReceber";
import Seguranca from "./Segurança"
import EditaFornecedor from "./Cadastros/Fornecedor/EditaFornecedor";
import EditaOperacao from "./Cadastros/Operacao/editaOperacao";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Header />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<CadastroClienteInicial />} />
        <Route path="/cadastroCliente" element={<CadastroCliente />} />
        <Route path="/editaCliente" element={<EditaCliente />} />
        <Route path="/cadastroFornecedorInicial" element={<CadastroFornecedorInicial />} />
        <Route path="/cadastroFornecedor" element={<CadastroFornecedor />} />
        <Route path="/editaFornecedor" element={<EditaFornecedor />} />
        <Route path="/cadastroOperacaoInicial" element={<CadastroOperacaoInicial />} />
        <Route path="/cadastroOperacao" element={<CadastroOperacao />} />
        <Route path="/editaOperacao" element={<EditaOperacao />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/financeiroReceber" element={<FinanceiroReceber />} />
        <Route path="seguranca" element={<Seguranca />} />
      </Routes>
    </Router>
  );
};

export default App;
