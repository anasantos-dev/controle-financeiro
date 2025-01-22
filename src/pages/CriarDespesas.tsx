import { useState } from "react";
import * as S from "./styles";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";
import styled from "styled-components";

// Estilizando o botão amarelo
const AlertButton = styled.button`
  background-color: #ffcc00;
  color: #000;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ffdd44;
  }
`;

const CriarDespesas = () => {
  const [user] = useAuthState(auth);

  const [form, setForm] = useState({
    descricao: "",
    categoria: "",
    valor: "",
    tipo: "entrada",
    data: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const valorNumerico = parseFloat(form.valor);

    const despesaData = {
      descricao: form.descricao,
      categoria: form.categoria,
      valor: valorNumerico,
      tipo: form.tipo,
      data: form.data,
      userId: user?.uid,
    };

    setIsLoading(true);

    try {
      const response = await http.post("despesas", despesaData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta da API:", response.data);
      setIsSubmitted(true);

      setForm({
        descricao: "",
        categoria: "",
        valor: "",
        tipo: "entrada",
        data: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar despesa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlert = () => {
    alert("Atenção: Você está adicionando uma saída acima de R$ 700,00!");
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
        {isSubmitted && (
          <S.SuccessMessage>Despesa enviada com sucesso!</S.SuccessMessage>
        )}

        {/* Exibe o botão amarelo se for uma saída maior que R$ 700 */}
        {form.tipo === "saída" && parseFloat(form.valor) > 700 && (
          <AlertButton type="button" onClick={handleAlert}>
            Alerta: Saída Acima de R$ 700,00
          </AlertButton>
        )}

        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default CriarDespesas;
