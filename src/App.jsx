import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Hoje from "./pages/Hoje";
import Habitos from "./pages/Habitos";
import logo from "./assets/logo.png";
import GlobalStyle from "./styles/GlobalStyle";


export default function App() {
  const { user } = useContext(UserContext);

  return (
    <>      
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/hoje" /> : <Login />} />
        <Route path="/cadastro" element={user ? <Navigate to="/hoje" /> : <Cadastro />} />
        <Route path="/hoje" element={user ? <Hoje /> : <Navigate to="/" />} />
        <Route path="/habitos" element={user ? <Habitos /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
