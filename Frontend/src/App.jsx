import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Turmas from "./pages/Turmas";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import TurmasEditar from "./pages/TurmasEditar";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import RecuperarSenha from "./pages/RecuperarSenha";
import ResetSenha from "./pages/ResetSenha";
import MateriaCadastrar from "./pages/MateriaCadastrar";
import MateriaListar from "./pages/MateriaListar";
import MateriaEditar from "./pages/MateriaEditar";
import Simulados from "./pages/Simulados";
import TurmasSimulados from "./pages/TurmasSimulados";
import SimuladosCadastrar from "./pages/SimuladosCadastrar";
import SimuladosEditar from "./pages/SimuladosEditar";

function App() {
  return (



    <Routes>

<Route path="/reset-senha" element={
          <ResetSenha />
      } />

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

      <Route path="Turmas/" element={
        <Layout>
          <Turmas />
        </Layout>
      } />

      <Route path="Turmas/:ano" element={
        <Layout>
          <Turmas />
        </Layout>
      } />

      <Route path="Turma/Editar/:id" element={
        <Layout>
          <TurmasEditar />
        </Layout>
      } />

      <Route path="Turma/:id" element={
        <Layout>
          <TurmasSimulados />
        </Layout>
      } />

      <Route path="/Simulados" element={
        <Layout>
          <Simulados />
        </Layout>
      } />

      <Route path="/Simulados/:bimestre/:ano/:serie?" element={
        <Layout>
          <Simulados />
        </Layout>
      }/>

      <Route path="/Simulados/Cadastrar" element={
        <Layout>
          <SimuladosCadastrar />
        </Layout>
      } />

      <Route path="/Simulado/Editar/:id" element={
        <Layout>
          <SimuladosEditar />
        </Layout>
      } />

      <Route path="/Materias/Cadastrar" element={
        <Layout>
          <MateriaCadastrar />
        </Layout>
      } />

      <Route path="/Materias" element={
        <Layout>
          <MateriaListar />
        </Layout>
      } />

      <Route path="/Materias/Editar/:id" element={
        <Layout>
          <MateriaEditar />
        </Layout>
      } />

    </Routes >
  );
}

export default App;