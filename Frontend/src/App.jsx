import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import RecuperarSenha from "./pages/RecuperarSenha";

function App() {
  return (
    <Routes>

 <Route path="/Login" element={
          <Login />
      } />

      <Route path="/Home" element={
        <Layout>
          <Home />
        </Layout>
      } />

    <Route path="/recuperar-senha" element={<RecuperarSenha />} />
    
      <Route path="Turmas/Cadastrar" element={
        <Layout>
          <TurmasCadastrar />
        </Layout>
      } />
    </Routes>

    
  );
}

export default App;
