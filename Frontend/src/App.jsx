import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TurmasCadastrar from "./pages/TurmasCadastrar";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";


function App() {
  return (
    <Routes>

 <Route path="/Login" element={
          <Login />
      } />

      <Route path="/Home" element={
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
