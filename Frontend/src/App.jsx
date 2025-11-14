import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import TurmasSimuldos from "./pages/TurmasSimulados";
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

      <Route path="Turma/:id" element={
        <Layout>
          <TurmasSimuldos />
        </Layout>
      } />
    </Routes>


  );
}

export default App;