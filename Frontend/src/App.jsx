import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import Home from "./pages/Home";
import MateriaCadastrar from "./pages/MateriaCadastrar";

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

      <Route path="Materias/Cadastrar" element={
        <Layout>
          <MateriaCadastrar />
        </Layout>
      } />
    </Routes>

    
  );
}

export default App;
