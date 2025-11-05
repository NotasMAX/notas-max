import { useNavigate } from "react-router-dom";

export default function FormularioPedido({ title, path }) {
  const navigate = useNavigate();

  function handlePath() {
    navigate(`${path}`);
  }

  return (
    <div className="">
      <h2>1º Bimestre</h2>

      <div className="rounded-sm border-1 border-gray-300 px-5 py-5 shadow-gray-700">
        <div className="flex justify-between gap-3">
          <div className="flex w-1/2 items-center justify-between rounded-sm border-1 border-gray-300 px-3 py-3">
            <p>Simulado</p>
            <p>20/01/2025</p>
            <button className="rounded-sm border-1 border-gray-300 p-5">
              ver mais
            </button>
          </div>

          <div className="flex w-1/2 items-center justify-between rounded-sm border-1 border-gray-300 px-3 py-3">
            <p>Simulado</p>
            <p>20/01/2025</p>
            <button className="rounded-sm border-1 border-gray-300 p-5">
              ver mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
