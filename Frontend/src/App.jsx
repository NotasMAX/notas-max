import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Turmas from "./pages/Turmas";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import TurmasEditar from "./pages/TurmasEditar";
import Home from "./pages/Home";
import MateriaCadastrar from "./pages/MateriaCadastrar";
import MateriaListar from "./pages/MateriaListar";
import MateriaEditar from "./pages/MateriaEditar";
import Simulados from "./pages/Simulados";
import TurmasSimulados from "./pages/TurmasSimulados";
import AlunoCadastrar from "./pages/AlunoCadastrar";
import AlunoListar from "./pages/AlunoListar";
import AlunoEditar from "./pages/AlunoEditar";
import AlunoVisualizar from "./pages/AlunoVisualizar";

function App() {
  return (
    <Routes>

      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />

      {/* Rotas de Turmas */}
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

      {/* Rotas de Simulados */}
      <Route path="/Simulados" element={
        <Layout>
          <Simulados />
        </Layout>
      } />

      <Route path="/Simulados/:id" element={
        <Layout>
          <Simulados />
        </Layout>
      } />

      {/* Rotas de Matérias */}
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

      {/* Rotas de Alunos */}
      <Route path="/Alunos/CadastrarAluno" element={
        <Layout>
          <AlunoCadastrar />
        </Layout>
      } />

      <Route path="/Alunos" element={
        <Layout>
          <AlunoListar />
        </Layout>
      } />

      <Route path="/Alunos/Visualizar/:id" element={
        <Layout>
          <AlunoVisualizar />
        </Layout>
      } />

      <Route path="/Alunos/Editar/:id" element={
        <Layout>
          <AlunoEditar />
        </Layout>
      } />

    </Routes >
  );
}

export default App;