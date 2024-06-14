import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import "./PagarInicial.css";
import MenuFinanceiro from "../../components/MenuFinanceiro";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const PagarInicial = () => {
    const [telaCadastrosAberta, setTelaLançamentosAberta] = useState("PAGAR");
    const [pagar, setPagar] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = (tela) => {
        setTelaLançamentosAberta(tela);
    };

    useEffect(() => {
        const fetchPagar = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/movimento");
                if (!response.ok) {
                    throw new Error("Erro ao buscar os pagamentos do banco de dados.");
                }
                const pagarData = await response.json();
                const sortedPagar = pagarData.sort((a, b) => a.pagar_id - b.pagar_id);
                setPagar(sortedPagar);
            } catch (error) {
                console.error("Erro ao buscar os pagamentos:", error);
            }
        };

        fetchPagar();
    }, []);

    const handleEditClick = async (pagarId) => {
        try {
            if (!pagarId) {
                throw new Error("ID do pagamento não fornecido.");
            }

            const response = await fetch(`http://localhost:3000/api/v1/pagar/${pagarId}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar detalhes do pagamento.");
            }
            const pagarData = await response.json();

            console.log("Detalhes do pagamento retornado:", pagarData.nome);
            console.log("ID:", pagarId);

            navigate("/editaPagar", { state: { pagarData, pagarId } });
        } catch (error) {
            console.error("Erro ao buscar os detalhes do pagamento:", error);
        }
    };

    return (
        <div>
            <Header />
            <MenuFinanceiro // Substituído MenuCadastros por MenuFinanceiro
                telaSelecionada={telaCadastrosAberta}
                handleButtonClick={handleButtonClick}
            />
            <div className="table-pagar-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>OPERAÇÃO</th>
                            <th>FORNECEDOR</th>
                            <th>TIPO</th>
                            <th>DATA</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagar.map((pagamento, index) => (
                            <tr key={index}>
                                <td>{pagamento.movimento_id}</td>
                                <td>{pagamento.operacao ? pagamento.operacao.descricao : ''}</td>
                                <td>{pagamento.fornecedor ? pagamento.fornecedor.nome : ''}</td>
                                <td>{pagamento.operacao && pagamento.operacao.tipo === 'S' ? 'Saída' : (pagamento.operacao ? pagamento.operacao.descricao : '')}</td>


                                <td>{new Date(pagamento.data_lancamento).toLocaleDateString()}</td>
                                <td>
                                    <button className="editar-button" onClick={() => handleEditClick(pagamento.movimento_id)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="btNovo">
                <Link to="/cadastroPagar">
                    <button>+</button>
                </Link>
            </div>
        </div>
    );
};

export default PagarInicial;
