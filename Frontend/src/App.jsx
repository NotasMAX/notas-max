import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import Home from "./pages/Home";
import ImportarNotas from "./pages/ImportarNotas";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="Turmas/Cadastrar"
        element={
          <Layout>
            <TurmasCadastrar />
          </Layout>
        }
      />

      <Route
        path="Alunos/Importar"
        element={
          <Layout>
            <ImportarNotas />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
