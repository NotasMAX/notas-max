import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
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
    </Routes >

    
  );
}

export default App;
