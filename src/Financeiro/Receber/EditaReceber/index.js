import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import "./EditaReceber.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";
import axios from 'axios';


const EditaReceber = () => {
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

export default EditaReceber;