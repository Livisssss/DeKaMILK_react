import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Cadastros from "./components/Cadastros";
import Financeiro from "./components/Financeiro";
import CadastroCliente from "./components/CadastroCliente";
import CadastroFornecedor from "./components/CadastroFornecedor"; // Corrigido o nome do componente aqui

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Header />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/cadastroCliente" element={<CadastroCliente />} />
        <Route path="/cadastroFornecedor" element={<CadastroFornecedor />} />
        <Route path="/financeiro" element={<Financeiro />} />
      </Routes>
    </Router>
  );
};

export default App;
