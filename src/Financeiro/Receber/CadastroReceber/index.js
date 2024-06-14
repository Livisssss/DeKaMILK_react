import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import "./CadastroReceber.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";
import axios from 'axios';


const CadastroReceber = () => {
    const [telaCadastrosAberta, setTelaLançamentosAberta] = useState("RECEBER");

    const handleButtonClick = (tela) => {
        setTelaLançamentosAberta(tela);
    };


    return (
        <div>
            <Header />

            <MenuFinanceiro
                telaSelecionada={telaCadastrosAberta}
                handleButtonClick={handleButtonClick}
            />


        </div>
    );
};

export default CadastroReceber;