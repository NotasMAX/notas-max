import { useNavigate } from "react-router-dom";

export default function FormularioPedido({ title, path }) {
  const navigate = useNavigate();

  function handlePath() {
    navigate(`${path}`);
  }

  return (
    <button
      onClick={handlePath}
      className="cursor-pointer rounded-sm border border-blue-600 bg-[#1C86EB] px-7 py-1 text-center text-white transition hover:bg-[#50AAFF]"
    >
      {title}
    </button>
  );
}
