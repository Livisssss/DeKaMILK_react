import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./Login";
import Home from "./Home";
import ClienteInicial from "./Cadastros/Cliente/ClienteInicial";
import CadastroCliente from "./Cadastros/Cliente/CadastroCliente";
import FornecedorInicial from "./Cadastros/Fornecedor/FornecedorInicial";
import CadastroFornecedor from "./Cadastros/Fornecedor/CadastroFornecedor";
import OperacaoInicial from "./Cadastros/Operacao/OperacaoInicial";
import CadastroOperacao from "./Cadastros/Operacao/CadastroOperacao";
import Financeiro from "./Financeiro/Pagar/LançamentoPagar";
import FinanceiroReceber from "./Financeiro/Receber/LançamentoReceber";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Header />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clienteInicial" element={<ClienteInicial />} />
        <Route path="/cadastroCliente" element={<CadastroCliente />} />
        <Route path="/fornecedorInicial" element={<FornecedorInicial />} />
        <Route path="/cadastroFornecedor" element={<CadastroFornecedor />} />
        <Route path="/operacaoInicial" element={<OperacaoInicial />} />
        <Route path="/cadastroOperacao" element={<CadastroOperacao />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/financeiroReceber" element={<FinanceiroReceber />} />
      </Routes>
    </Router>
  );
};

export default App;
