import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
import "./EditaOperacao.css";
import MenuCadastros from "../../components/MenuCadastros";
import { useNavigate } from "react-router-dom";

const EditaOperacao = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { operacaoData, operacaoId } = location.state || {};

    const [id, setId] = useState("");
    const [telaCadastrosAberta, setTelaCadastrosAberta] = useState("OPERAÇÕES");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");

    useEffect(() => {
        if (operacaoData) {
            setId(operacaoId || "");
            setDescricao(operacaoData.descricao || "");
            setTipo(operacaoData.tipo || "");
        }
    }, [operacaoData, operacaoId]);

    const handleButtonClick = (tela) => {
        setTelaCadastrosAberta(tela);
    };

    const verificarCamposObrigatorios = () => {
        if (!descricao.trim()) {
            return false;
        }
        if (!tipo.trim()) {
            return false;
        }
        return true;
    };


    // BOTÃO ALTERAR
    const alterarOperacao = async () => {
        if (!verificarCamposObrigatorios()) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const operacao = {
            id: operacaoId,
            descricao,
            tipo,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/v1/operacao/${operacaoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(operacao),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Operação alterada com sucesso!");
                navigate("/cadastroOperacaoInicial");
            } else {
                if (result.error) {
                    alert(result.error);
                } else {
                    alert("Erro ao alterar operação. Verifique os dados e tente novamente.");
                }
                console.error("Erro ao alterar operação:", result);
            }
        } catch (error) {
            console.error("Erro ao alterar operação:", error);
            alert("Erro ao alterar operação. Tente novamente.");
        }
    };


    // BOTÃO DELETAR
    const deletarOperacao = async () => {
        if (!operacaoId) {
            alert("ID da operação não encontrado.");
            return;
        }

        if (!window.confirm("Tem certeza que deseja deletar esta operação?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/operacao/${operacaoId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                navigate("/cadastroOperacaoInicial");
            } else {
                const result = await response.json();
                if (result.error) {
                    alert(result.error);
                } else {
                    alert("Erro ao deletar operação. Tente novamente.");
                }
            }
        } catch (error) {
            console.error("Erro ao deletar operação:", error);
            alert("Erro ao deletar operação. Tente novamente.");
        }
    };

    return (
        <div>
            <Header />
            <MenuCadastros
                telaSelecionada={telaCadastrosAberta}
                handleButtonClick={handleButtonClick}
            />

            <div className="formulario">
                <label htmlFor="descricao">DESCRIÇÃO*</label>
                <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} maxRows={4} style={{ resize: "none" }} />

                <div className="tipo">
                    <label htmlFor="tipo">TIPO*</label>
                    <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="E">Entrada</option>
                        <option value="S">Saída</option>
                    </select>
                </div>
            </div>

            <div className="botoes-crud">
                <div className="botoes-esquerda">
                    <button type="button" name="btAlterar" id="btAlterar" onClick={alterarOperacao}>ALTERAR</button>
                </div>
                <div className="botoes-direita">
                    <button type="button" name="btDeletar" id="btDeletar" onClick={deletarOperacao}>DELETAR</button>
                </div>
            </div>
        </div>
    );
};

export default EditaOperacao;
