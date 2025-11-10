import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import TurmasEditar from "./pages/TurmasEditar";
import Turmas from "./pages/Turmas";
import Home from "./pages/Home";


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

      <Route path="Turmas/Editar/:id" element={
        <Layout>
          <TurmasEditar />
        </Layout>
      } />
    </Routes >


  );
}

export default App;
