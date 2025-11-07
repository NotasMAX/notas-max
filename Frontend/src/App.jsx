import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
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
    </Routes>

    
  );
}

export default App;
