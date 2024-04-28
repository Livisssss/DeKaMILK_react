import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Cadastros from "./components/Cadastros";
import Clientes from "./components/CadastroCliente";
import Financeiro from "./components/Financeiro";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/cadastroCliente" element={<Clientes />} />
      </Routes>
    </Router>
  );
};

export default App;
