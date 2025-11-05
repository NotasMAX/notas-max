import { useNavigate } from "react-router-dom";

export default function FormularioPedido({ title, path }) {
  const navigate = useNavigate();

  function handlePath() {
    navigate(`${path}`);
  }

  return (
    <button
      onClick={handlePath}
      className="cursor-pointer rounded-sm border border-gray-300 bg-gray-100 px-7 py-1 text-center text-gray-800 transition hover:bg-gray-200"
    >
      {title}
    </button>
  );
}
