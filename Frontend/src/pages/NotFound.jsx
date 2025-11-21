import { useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <img src={logo} alt="Página não encontrada" className="w-[200px]"  />
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Ops! Essa página não foi encontrada!</p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-[#052c55] text-white rounded hover:bg-blue-700 transition"
            >
              Clique aqui para retornar
            </button>
        </div>
    )
}