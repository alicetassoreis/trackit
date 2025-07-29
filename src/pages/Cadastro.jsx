import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import logo from "../assets/logo.png";
import { ThreeDots } from "react-loader-spinner";

export default function Cadastro() {
  const [form, setForm] = useState({ email: "", name: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function cadastrar(e) {
    e.preventDefault();
    setLoading(true);

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const promise = axios.post(URL, form);

    promise.then(() => {
      navigate("/");
    });

    promise.catch((err) => {
      alert(err.response.data.message);
      setLoading(false);
    });
  }

  return (
    <Container>
<img src="/logo.png" alt="TrackIt logo" />

      <form onSubmit={cadastrar}>
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
        <input
          data-identifier="input-name"
          type="text"
          placeholder="nome"
          name="name"
          value={form.name}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <input
          data-identifier="input-photo"
          type="url"
          placeholder="foto"
          name="image"
          value={form.image}
          onChange={handleForm}
          disabled={loading}
          required
        />
        <button data-identifier="register-btn" type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots
              height="13"
              width="51"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
      <Link data-identifier="back-to-login-action" to="/">Já tem uma conta? Faça login!</Link>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  min-height: 100vh;
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
      height: 45px;
      margin-bottom: 6px;
      padding: 0 11px;
      border: 1px solid #d5d5d5;
      border-radius: 5px;
      font-size: 20px;

      &::placeholder {
        color: #dbdbdb;
      }
    }

    button {
      height: 45px;
      background-color: #52b6ff;
      color: #ffffff;
      font-size: 21px;
      border: none;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  a {
    margin-top: 25px;
    font-size: 14px;
    color: #52b6ff;
    text-decoration: underline;
  }
`;
