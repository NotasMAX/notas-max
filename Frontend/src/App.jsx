import { Routes, Route } from "react-router-dom";
import Style from "./styles/App.module.css";
import TurmasCadastrar from "../pages/TurmasCadastrar";

function App() {
  return (
    <div className={Style.MainContainer}>
      <Routes>
  <Route path="Turmas/Cadastrar" element={<TurmasCadastrar />} />
      </Routes>
    </div>
  );
}

export default App;
