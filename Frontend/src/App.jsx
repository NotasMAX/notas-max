import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import TurmasSimuldos from "./pages/TurmasSimulados";
import Home from "./pages/Home";
import MateriaCadastrar from "./pages/MateriaCadastrar";
import MateriaListar from "./pages/MateriaListar";
import MateriaEditar from "./pages/MateriaEditar";

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


      <Route path="Turma/:id" element={
        <Layout>
          <TurmasSimuldos />
        </Layout>
      } />

      <Route path="Materias/Cadastrar" element={
        <Layout>
          <MateriaCadastrar />
        </Layout>
      } />

      <Route path="Materias" element={
        <Layout>
          <MateriaListar />
        </Layout>
      } />

      <Route path="Materias/Editar/:id" element={
        <Layout>
          <MateriaEditar />
        </Layout>
      } />
    </Routes>


  );
}

export default App;