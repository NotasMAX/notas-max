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
import SimuladosAlunosList from "./pages/SimuladosAlunosList";
import SimuladoNotasPorMateria from "./pages/SimuladoNotasPorMateria";
import SimuladoNotasPorSimulado from "./pages/SimuladoNotasPorSimulado";

function App() {
  return (
    <Routes>

      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />

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

      <Route path="Turmas/Simulado/:id" element={
        <Layout>
          <TurmasSimulados />
        </Layout>
      } />

      <Route path="Turmas/Simulado/Aluno/:id" element={
        <Layout>
          <SimuladosAlunosList />
        </Layout>
      } />

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

      <Route path="/Simulados/Notas/id" element={
        <Layout>
          <SimuladoNotasPorSimulado />
        </Layout>
      } />

      <Route path="/Simulados/Notas/Materia/id" element={
        <Layout>
          <SimuladoNotasPorMateria />
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