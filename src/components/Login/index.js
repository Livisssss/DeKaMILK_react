import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  function logar() {
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    if (login === "admin" && senha === "admin") {
      localStorage.setItem("user", "qualquercoisa");
      navigate("/home");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <section className="area-login">
      <div className="logo">
        <img src="./imgs/vaca.png" alt="Logo Vaca" />
        <h1>
          DEKA<span>MILK</span>
        </h1>
      </div>

      <div className="inputs">
        <input type="text" placeholder="Usuário" id="login" />
        <input type="password" placeholder="Senha" id="senha" />
      </div>

      <div>
        <button className="btEntrar" type="button" id="enviar" onClick={logar}>
          Entrar
        </button>
      </div>
    </section>
  );
};

export default Login;
