import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import logo from "../assets/logo.png";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function login(e) {
    e.preventDefault();
    setLoading(true);

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    axios.post(URL, form)
      .then(res => {
localStorage.setItem("user", JSON.stringify(res.data)); 
setUser(res.data);
navigate("/hoje");
      })
      .catch(err => {
        alert(err.response.data.message);
        setLoading(false);
      });
  }

  return (
    <Container>
  <img src="/logo.png" alt="TrackIt logo" />


      <form onSubmit={login}>
        <input
          data-identifier="input-email"
          type="email"
          placeholder="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <input
          data-identifier="input-password"
          type="password"
          placeholder="senha"
          name="password"
          value={form.password}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <button data-identifier="login-btn" type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots
              height="13"
              width="51"
              radius="9"
              color="#FFFFFF"
              ariaLabel="loading"
              visible={true}
            />
          ) : (
            "Entrar"
          )}
        </button>
      </form>
      <Link data-identifier="sign-up-action" to="/cadastro">
        Não tem uma conta? Cadastre-se!
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  padding: 68px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 180px;
    margin-bottom: 32px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
    
      width: 100%;
      height: 45px;
      margin-bottom: 6px;
      padding: 0 11px;
      font-size: 20px;
      border: 1px solid #d5d5d5;
      border-radius: 5px;

      &::placeholder {
        color: #dbdbdb;
      }
    }

    button {
      width: 100%;
      height: 45px;
      background-color: #52b6ff;
      color: white;
      font-size: 21px;
      border: none;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:disabled {
        opacity: 0.7;
        cursor: default;
      }
    }
  }

  a {
    margin-top: 25px;
    font-size: 0.875rem;
    color: #52b6ff;
    text-decoration: underline;
  }
`;
