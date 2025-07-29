import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { ThreeDots } from "react-loader-spinner";


export default function Hoje() {
  const { user } = useContext(UserContext);
  const [habitosHoje, setHabitosHoje] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!user) return;
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
      .then(res => {
        setHabitosHoje(res.data);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, [user]);

  function toggleHabito(habito) {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const urlBase = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`;
    const url = habito.done ? `${urlBase}/uncheck` : `${urlBase}/check`;

    axios
      .post(url, {}, config)
      .then(() => {
        setHabitosHoje((habitos) =>
          habitos.map(h =>
            h.id === habito.id ? { ...h, done: !h.done } : h
          )
        );
      })
      .catch((err) => alert("Erro ao atualizar hábito"));
  }

  function formatarData() {
    const hoje = dayjs();
    const diaSemana = hoje.locale("pt-br").format("dddd");
    const diaMes = hoje.format("DD/MM");

    return diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1) + ", " + diaMes;
  }

  return (
    <>
      <Header />
      <Container>
        <Titulo data-test="today">{formatarData()}</Titulo>
        {carregando ? (
                    <Mensagem>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#126BA5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </Mensagem>
        ) : habitosHoje.length === 0 ? (
          <Mensagem>Você não tem hábitos para hoje :(</Mensagem>
        ) : (
          habitosHoje.map(habito => (
            <Habito key={habito.id} done={habito.done} onClick={() => toggleHabito(habito)} data-test="today-habit-container">
              <div>
                <h3>{habito.name}</h3>
                <p>
                  Sequência atual:{" "}
                  <Sequencia done={habito.done}>
                    {habito.currentSequence} {habito.currentSequence === 1 ? "dia" : "dias"}
                  </Sequencia>
                </p>
                <p>
                  Seu recorde:{" "}
                  <Sequencia recorde={habito.currentSequence === habito.highestSequence && habito.highestSequence !== 0}>
                    {habito.highestSequence} {habito.highestSequence === 1 ? "dia" : "dias"}
                  </Sequencia>
                </p>
              </div>
              <Checkbox $done={habito.done}>
                ✓
              </Checkbox>
            </Habito>
          ))
        )}
      </Container>
      <Menu />
    </>
  );
}

const Container = styled.main`
      background-color: #f2f2f2;
      min-height: 100vh;
  padding: 9px 18px 100px 18px; 
  box-sizing: border-box;
`;

const Titulo = styled.h2`
  font-size: 23px;
  color: #126ba5;
      font-weight: normal;
  margin-bottom: 28px;
  margin-top: 90px;
`;

const Habito = styled.article`
  background-color: white;
  padding: 13px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  div h3 {
    font-size: 20px;
    color: #666666;
    margin-bottom: 7px;
    margin-top: 7px;
    font-weight: normal;
  }

    p {
    font-size: 13px;
    color: #666666;
    line-height: 0.2;
  }
`;

const Mensagem = styled.div`
    font-size: 18px;
    color: #666666;
`

const Sequencia = styled.span`
  color: #666666;
`;

const Checkbox = styled.div`
margin-top: 2px;
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.$done ? "#8FC549" : "#EBEBEB")};
  border-radius: 5px;
  border: 1px solid ${(props) => (props.$one ? "#8FC549" : "#E7E7E7")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  color: white;
  font-weight: bold;
`;
