import Header from "../Header";
import "./Cadastros.css";

const Cadastros = () => {
  return (
    <div>
      <Header />
      <div className="botoes">
        <button>CLIENTES</button>
        <button>FORNECEDORES</button>
        <button>OPERAÇÕES</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>ENDEREÇO</th>
            <th>CIDADE</th>
            <th>UF</th>
            <th>CEP</th>
            <th>TELEFONE</th>
            <th>E-MAIL</th>
            <th>EDITAR</th>
          </tr>
        </thead>

        <tbody>
        <tr>
          <td>Nome 2</td>
          <td>987.654.321-00</td>
          <td>Endereço 2</td>
          <td>Cidade 2</td>
          <td>UF 2</td>
          <td>98765-432</td>
          <td>(XX) XXXX-XXXX</td>
          <td>email2@example.com</td>
        </tr>
        <tr>
          <td>Nome 3</td>
          <td>456.789.123-00</td>
          <td>Endereço 3</td>
          <td>Cidade 3</td>
          <td>UF 3</td>
          <td>45678-912</td>
          <td>(XX) XXXX-XXXX</td>
          <td>email3@example.com</td>
        </tr>

        </tbody>

      </table>


    </div>
  );
};


function adicionarBotaoEditar() {
  // Seleciona todas as linhas da tabela
  const linhas = document.querySelectorAll("tbody tr");

  // Para cada linha, adiciona um botão de editar
  linhas.forEach((linha) => {
    // Cria um elemento de botão
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    // Adiciona um evento de clique ao botão (opcional)
    botaoEditar.addEventListener("click", () => {
      // Lógica para editar a linha...
      alert("Editar linha selecionada");
    });

    // Cria uma célula (td) e adiciona o botão dentro dela
    const celulaEditar = document.createElement("td");
    celulaEditar.appendChild(botaoEditar);

    // Insere a célula com o botão de editar na última posição da linha
    linha.appendChild(celulaEditar);
  });
}

// Chama a função para adicionar o botão de editar após o carregamento do documento
document.addEventListener("DOMContentLoaded", adicionarBotaoEditar);



export default Cadastros;
