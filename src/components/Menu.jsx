import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function Menu() {
  return (
    <Container> 
      <NavLink data-test="habit-link" to="/habitos"className={({ isActive }) => (isActive ? "botao ativo" : "botao")}><CalendarMonthIcon/>Hábitos</NavLink>
      <NavLink data-test="today-link" to="/hoje"className={({ isActive }) => (isActive ? "botao ativo" : "botao")}><EventAvailableIcon></EventAvailableIcon>Hoje</NavLink>
    </Container>
  );
}

const Container = styled.nav`
  width: 100%;
  height: 65px;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
  flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #D4D4D4;
    font-size: 18px;
    text-decoration: none;
  }
    svg {
    vertical-align: middle; 
    }

    .botao {
  color: gray;
  text-decoration: none;
  padding: 18px 16px;
}

.botao.ativo {
  color: white;
  background-color: #52b6ff; /* azul do TrackIt */
}
`;
