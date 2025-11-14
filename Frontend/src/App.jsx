import { Routes, Route } from 'react-router-dom';
import SelectSimulado from './pages/SelectSimulado';

function App() {

  return (

    <div>
      <Routes>
        <Route path='/selecionar-simulado' element={<SelectSimulado />} />
      </Routes>
    </div>

  )
}

export default App
