import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import "./ReceberInicial.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const ReceberInicial = () => {
    const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("RECEBER");
    const [recebimentosEntrada, setRecebimentosEntrada] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = (tela) => {
        setTelaCadastrosAberta(tela);
    };

    useEffect(() => {
        const fetchRecebimentosEntrada = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/movimento?tipo=E");
                if (!response.ok) {
                    throw new Error("Erro ao buscar os recebimentos de entrada do banco de dados.");
                }
                const recebimentosData = await response.json();
                setRecebimentosEntrada(recebimentosData);
            } catch (error) {
                console.error("Erro ao buscar os recebimentos de entrada:", error);
            }
        };

        fetchRecebimentosEntrada();
    }, []);

    const handleEditClick = async (recebimentoId) => {
        try {
            if (!recebimentoId) {
                throw new Error("ID do recebimento não fornecido.");
            }

            const response = await fetch(`http://localhost:3000/api/v1/receber/${recebimentoId}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar detalhes do recebimento.");
            }
            const recebimentoData = await response.json();

            console.log("Detalhes do recebimento retornado:", recebimentoData);
            console.log("ID:", recebimentoId);

            navigate("/editaReceber", { state: { recebimentoData, recebimentoId } });
        } catch (error) {
            console.error("Erro ao buscar os detalhes do recebimento:", error);
        }
    };

    return (
        <div>
            <Header />
            <MenuFinanceiro
                telaSelecionada={telaCadastrosAberta}
                handleButtonClick={handleButtonClick}
            />
            <div className="table-receber-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>OPERAÇÃO</th>
                            <th>CLIENTE</th>
                            <th>TIPO</th>
                            <th>DATA</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recebimentosEntrada.map((recebimento, index) => (
                            <tr key={index}>
                                <td>{recebimento.movimento_id}</td>
                                <td>{recebimento.operacao ? recebimento.operacao.descricao : ''}</td>
                                <td>{recebimento.cliente ? recebimento.cliente.nome : ''}</td>
                                <td>Entrada</td>
                                <td>{new Date(recebimento.data_lancamento).toLocaleDateString()}</td>
                                <td>
                                    <button className="editar-button" onClick={() => handleEditClick(recebimento.movimento_id)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="btNovo">
                <Link to="/cadastroReceber">
                    <button>+</button>
                </Link>
            </div>
        </div>
    );
};

export default ReceberInicial;
