import { useEffect, useState } from "react";
import Modal from "react-modal"; // Adicionado para o pop-up
import * as S from "./styles";
import ChatGemini from "../components/chat-gemini/ChatGemini";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";

Modal.setAppElement("#root"); // Configuração necessária do react-modal

type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
  user: string;
};

const Dashboard = () => {
  const [despesas, setDespesas] = useState([] as Despesa[]); // Estado para armazenar as despesas
  const [totalDespesas, setTotalDespesas] = useState(0); // Estado para o total das despesas
  const [user] = useAuthState(auth); // Hook do Firebase
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        console.log("Executando fetchDespesas..."); // Log de depuração
        console.log("Objeto User:", user); // Log para exibir o usuário
        console.log("User ID:", user?.uid); // Log para exibir o ID do usuário

        if (!user?.uid) {
          console.warn("Usuário não autenticado."); // Aviso caso o usuário não esteja autenticado
          return;
        }

        // Busca as despesas do usuário
        const response = await http.get(`/despesas/${user.uid}`);
        setDespesas(response.data);

        // Busca o total de despesas do usuário
        const totalResponse = await http.get(`/despesas/total/${user.uid}`);
        const total = totalResponse.data.total;
        setTotalDespesas(total); // Atualiza o total no estado

        // Verifica se o total ultrapassou o limite
        if (total > 20000) {
          setIsModalOpen(true); // Abre o modal se o limite for ultrapassado
        }
      } catch (error) {
        console.error("Erro ao buscar despesas ou total:", error); // Log para erros
      }
    };

    fetchDespesas(); // Chama a função ao carregar o componente
  }, [user?.uid]);

  const calcularTotais = () => {
    if (despesas.length === 0) {
      return { entradas: 0, saidas: 0, saldo: 0 }; // Retorna valores padrão se não houver despesas
    }

    const entradas = despesas
      .filter((d) => d.tipo === "entrada" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesas
      .filter((d) => d.tipo === "saída" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>

      {/* Modal de alerta quando o limite é ultrapassado */}
      <Modal
        isOpen={isModalOpen} // Controla se o modal está aberto
        onRequestClose={() => setIsModalOpen(false)} // Fecha o modal
        contentLabel="Alerta de Limite de Despesas"
        style={{
          content: {
            color: "black",
            backgroundColor: "lightyellow",
            padding: "20px",
            borderRadius: "10px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <h2>Atenção!</h2>
        <p>O total de despesas ultrapassou o limite planejado de R$ 20.000,00.</p>
        <p>Total atual: R$ {totalDespesas.toFixed(2)}</p> {/* Exibindo o total no modal */}
        <button onClick={() => setIsModalOpen(false)}>Fechar</button>
      </Modal>

      {/* Totais de Entradas, Saídas e Saldo */}
      <S.CardsContainer>
        <S.Card $bgColor="#FF8C00">
          <p>Entradas</p>
          <p>R$ {(entradas || 0).toFixed(2)}</p>
        </S.Card>
        <S.Card $bgColor="#B22222">
          <p>Saídas</p>
          <p>R$ {(saidas || 0).toFixed(2)}</p>
        </S.Card>
        <S.Card $bgColor="#006400">
          <p>Saldo</p>
          <p>R$ {(saldo || 0).toFixed(2)}</p>
        </S.Card>
      </S.CardsContainer>

      {/* Tabela com os dados das despesas */}
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao || "Não informado"}</td>
              <td>{despesa.categoria || "Não informado"}</td>
              <td>R$ {(despesa.valor ?? 0).toFixed(2)}</td>
              <td>{despesa.tipo || "Não informado"}</td>
              <td>{despesa.data || "Não informado"}</td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>

      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;
