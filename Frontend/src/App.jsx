import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import TurmasCadastrar from "../pages/TurmasCadastrar";


function App() {
  return (
      <Routes>
        <Route path="/" element={<div>Página Inicial</div>} />
        <Route path="Turmas" element={<TurmasCadastrar/>} />
        <Route path="Turmas/Cadastrar" element={
          <Layout>
            <TurmasCadastrar />
          </Layout>
        } />
      </Routes>
  );
}

export default App;
