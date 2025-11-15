import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardSimulado from './CardSimulado.jsx';

export default function BimestreSections({ simulados }) {

  const navigate = useNavigate();

  const handleView = async (id) => {

    navigate(`/Turma/Simulado/${id}`);

  }

  return (
    <div>

      <div className="inset-shadow h-1/2 flex justify-around flex-wrap gap-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 shadow-lg/20 shadow-gray-700">

        {[...simulados]?.sort((a, b) => Number(a.numero) - Number(b.numero)).map(simulado =>
        (

          <CardSimulado
            key={simulado._id}
            simulado={simulado}
            onView={() => handleView(simulado._id)}
          />

        ))
        }

      </div>
    </div>
  );
}
