import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import logo2 from "../assets/logo2.png";
import React from 'react';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  
  return (
    <Container>
      <Logo src={logo2} alt="TrackIt" />
      {user && <Avatar src={user.image} alt="user" onClick={logout} />}
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #126ba5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  z-index: 1;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
`;


const Logo = styled.img`
`;


const Avatar = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  object-fit: cover;
  background-color: red;
  cursor: pointer;
`;
