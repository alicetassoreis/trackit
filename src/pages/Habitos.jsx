import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { ThreeDots } from "react-loader-spinner";


export default function Habitos() {
  const [habitos, setHabitos] = useState([]);
  const [novoHabito, setNovoHabito] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [mostrarNovoHabito, setMostrarNovoHabito] = useState(false);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); 
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then((res) => {
        setHabitos(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        alert("Erro ao carregar hábitos");
        setLoading(false); 
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const diasSemana = [
    { id: 0, nome: "D" },
    { id: 1, nome: "S" },
    { id: 2, nome: "T" },
    { id: 3, nome: "Q" },
    { id: 4, nome: "Q" },
    { id: 5, nome: "S" },
    { id: 6, nome: "S" },
  ];

  useEffect(() => {
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then((res) => setHabitos(res.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  function toggleDia(id) {
    if (diasSelecionados.includes(id)) {
      setDiasSelecionados(diasSelecionados.filter((dia) => dia !== id));
    } else {
      setDiasSelecionados([...diasSelecionados, id]);
    }
  }

function salvarHabito() {
  if (novoHabito.trim() === "") return;

  setLoading(true);

  const body = {
    name: novoHabito,
    days: diasSelecionados,
  };

  axios
    .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
    .then((res) => {
      setHabitos([...habitos, res.data]);
      setNovoHabito("");
      setDiasSelecionados([]);
      setMostrarNovoHabito(false);
    })
    .catch((err) => {
      alert("Erro ao salvar hábito.");
    })
    .finally(() => setLoading(false));
}


  return (
    <>
      <Header />
      <Container>
        <Titulo>
          Meus hábitos
          <button onClick={() => setMostrarNovoHabito(true)}>+</button>
        </Titulo>

        {mostrarNovoHabito && (
          <NovoHabito>
            <input
              data-test="habit-name-input"
              placeholder="nome do hábito"
              value={novoHabito}
              onChange={(e) => setNovoHabito(e.target.value)}
            />
            <Dias>
              {diasSemana.map((dia) => (
                <Dia
                  key={dia.id}
                  type="button"
                  data-test="habit-day"
                  onClick={() => toggleDia(dia.id)}
                  $selecionado={diasSelecionados.includes(dia.id)}
                >
                  {dia.nome}
                </Dia>
              ))}
            </Dias>
            <Acoes>
              <Cancelar data-test="habit-create-cancel-btn" onClick={() => setMostrarNovoHabito(false)}>Cancelar</Cancelar>
              <Salvar 
                data-test="habit-create-save-btn"
                onClick={salvarHabito}
                disabled={loading}
              >
                {loading ? (
                  <ThreeDots 
                    height="13" 
                    width="51" 
                    color="#FFFFFF" 
                    ariaLabel="loading"
                  />
                ) : (
                  "Salvar"
                )}
              </Salvar>

            </Acoes>
          </NovoHabito>
        )}

{loading ? (
  <Mensagem>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#126BA5"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </Mensagem>
) : habitos.length === 0 ? (
  <Mensagem data-test="habit-message">
    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
  </Mensagem>
) : (
  habitos.map((habito) => (
    <Habito data-test="habit-container" key={habito.id}>
      <h3 data-test="habit-name">{habito.name}</h3>
      <Dias>
        {diasSemana.map((dia) => (
          <Dia
            key={dia.id}
            $selecionado={habito.days.includes(dia.id)}
            disabled
            data-test="habit-day"
          >
            {dia.nome}
          </Dia>
        ))}
      </Dias>
    </Habito>
  ))
)}

      </Container>
      <Menu />
    </>
  );
}


const Container = styled.div`
  background-color: #f2f2f2;
  min-height: 100vh;
  padding: 90px 18px 70px;
    width: 100%;
`;

const Titulo = styled.div`
  font-size: 23px;
  color: #126ba5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  button {
    background-color: #52b6ff;
    color: white;
    border: none;
    width: 40px;
    height: 35px;
    font-size: 27px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Habito = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  padding-top: 1px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);

  h3 {
    font-size: 20px;
    color: #666666;
    margin-bottom: 10px;
    font-weight: normal;
  }
`;

const NovoHabito = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;

  input {
    width: 95%;
    height: 40px;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    color: #666666;
  }

    input::placeholder {
    color: #DBDBDB;
  }
`;

const Dias = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Dia = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  background-color: ${(props) => (props.$selecionado ? "#cfcfcf" : "white")};
  color: ${(props) => (props.$selecionado ? "white" : "#dbdbdb")};
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
`;

const Acoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Cancelar = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #52b6ff;
  cursor: pointer;
`;

const Salvar = styled.button`
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
    opacity: ${props => props.disabled ? 0.7 : 1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Mensagem = styled.p`
  font-size: 18px;
  color: #666666;
  margin-top: 10px;
`;
