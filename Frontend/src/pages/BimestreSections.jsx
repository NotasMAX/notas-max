import { useEffect, useState } from 'react';
import { allSimulados } from '../api/simuladoapi.js';
import { useNavigate } from 'react-router-dom';
import CardSimulado from '../components/CardSimulado.jsx';

export default function FormularioPedido() {

  const navigate = useNavigate();
  const [simulados, setSimulados] = useState([])
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState(null);

  const loadSimulados = async () => {

    try {

      setCarregando(true);

      const res = await allSimulados();

      setSimulados(res.data.simulados);

    } catch (error) {

      setError(error.message || 'Erro ao carregar simulados');

    } finally {

      setCarregando(false);

    }

  };// fim loadSimulados


  useEffect(() => {
    loadSimulados();
  }, []);

  const handleView = async (id) => {

    navigate(`/listar-alunos/${id}`);

  }

  return (
    <div class="p-2">
      <h2>{simulados.bimestre}º Bimestre</h2>

      {carregando && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div class="inset-shadow- flex flex-wrap gap-1 rounded-lg border-1 border-gray-300 bg-gray-50 px-3 py-3 shadow-lg/20 shadow-gray-700">

        {simulados?.length === 0 && !carregando ? (
          <p>Simulados não encontrados</p>
        ) : (

          simulados?.map(simulado =>
          (
            <CardSimulado
              simulado={simulado}
              onView={() => handleView(simulado._id)}
            />
          ))

        )}

      </div>
    </div>
  );
}
