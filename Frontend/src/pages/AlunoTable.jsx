import ButtonGrayLight from './Buttons/ButtonGrayLight.jsx';
import { useNavigate } from 'react-router-dom';

export default function AlunoTable() {

    const navigate = useNavigate();

    function handlerView(id) {
        navigate(`/view-notas/${id}`);
    }

    return (

        <div className="p-5">
            <div className="mb-5">
                <h1 className="text-2xl font-bold text-[#043666]">Turma 1ºEM - Simulado 1</h1>
                <p className="text-sm font-normal text-gray-800">Lista de alunos que realizaram o simulado 1, no 2º Bimestre de 2025</p>
            </div>

            <div className="mb-5">
            <button onClick={() => (handlerEditTurma)} className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Editar Turma</button>
            </div>

            <div>
                <div className="flex gap-2 rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/4">Nome Aluno</div>
                    <div className="w-1/4">Ultima modificação</div>
                    <div className="w-1/4">Nº de Acertos</div>
                    <div className="w-1/4">Ação</div>
                </div>

                <div>
                    <div className="mt-2 flex items-center gap-2 rounded-sm border border-gray-200 bg-white p-2">
                        <div className="w-1/4">Ana maria</div>
                        <div className="w-1/4">20/10/2025</div>
                        <div className="w-1/4">20/30</div>
                        <div className="w-1/4">
                            <button onClick={() => (handlerView)} className="cursor-pointer rounded-sm border border-gray-300 px-2 py-1.5 hover:bg-gray-100">👁</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}