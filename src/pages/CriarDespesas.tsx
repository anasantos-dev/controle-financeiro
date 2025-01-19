import { useState } from "react";
import axios from "axios";
import * as S from "./styles";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";

const CriarDespesas = () => {
  const [user] = useAuthState(auth); // Hook do Firebase pa

  const [form, setForm] = useState({
    descricao: "",
    categoria: "",
    valor: "",
    tipo: "entrada",
    data: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar a mensagem de sucesso
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento durante o envio

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Montando o objeto com os dados do formulário
    const despesaData = {
      descricao: form.descricao,
      categoria: form.categoria,
      valor: form.valor,
      tipo: form.tipo,
      data: form.data,
      userId: user?.uid,
    };

    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await http.post("despesas", despesaData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta da API:", response.data);

      // Exibe a mensagem de sucesso
      setIsSubmitted(true);

      // Limpa os dados do formulário após o envio
      setForm({
        descricao: "",
        categoria: "",
        valor: "",
        tipo: "entrada",
        data: "",
      });

      // Esconde a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar despesa:", error);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <S.Container>
      <S.Title>Criar Nova Despesa</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />

        <S.Input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
        />

        <S.Input
          name="valor"
          placeholder="Valor"
          type="number"
          value={form.valor}
          onChange={handleChange}
        />

        <S.Select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="entrada">Entrada</option>
          <option value="saída">Saída</option>
        </S.Select>

        <S.Input
          name="data"
          placeholder="Data"
          type="date"
          value={form.data}
          onChange={handleChange}
        />

        {/* Exibir a mensagem de sucesso */}
        {isSubmitted && (
          <S.SuccessMessage>Despesa enviada com sucesso!</S.SuccessMessage>
        )}

        {/* Botão para envio */}
        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default CriarDespesas;