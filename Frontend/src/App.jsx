import { Routes, Route } from "react-router-dom";
import TurmasList from "../pages/TurmasCadastro";


function App() {
  return (

    <div className="container mx-auto p-4">
      <Routes>
        <Route path="Turmas/Cadastrar" element={<TurmasList />} />
      </Routes>
    </div>

  );
}

export default App;
