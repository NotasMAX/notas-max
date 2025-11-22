export default function NotasList() {

    return (

        <div>
            <div className="mb-5">
                <h1 className="text-2xl font-bold text-[#043666]">Notas Aluno(a) - Ana Maria</h1>
                <p className="text-sm font-normal text-gray-800">Número de acertos, visualização individual por materia</p>
            </div>

            <div className="mb-5">
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Lançar Notas Simulado</button>
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Importar Notas excel</button>
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Média Materia</button>
                <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Editar Acertos do Aluno</button>
            </div>

            <div className="mb-2 flex justify-between">
                <select className="rounded-sm border border-gray-300 bg-gray-50/20 px-2 py-1 text-lg text-gray-800">
                    <option selected>Fisica - Rô</option>
                    <option>Geografia - Maria</option>
                    <option>Fisica - Marcelo</option>
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/4">Nº Simulado</div>
                    <div className="w-1/4">Tipo</div>
                    <div className="w-1/4">Peso</div>
                    <div className="w-1/4">Resultado</div>
                </div>

                <NotasSimuladosCard simuladoResult={simuladoResult} />



                <div className="flex rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/2">Total de Acertos</div>
                    <div className="w-1/2">20 / 30</div>
                </div>

                <div className="flex rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/2">Nota Objetiva</div>
                    <div className="w-1/2">7.5</div>
                </div>

                <div className="flex rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/2">Nota Dissertativa</div>
                    <div className="w-1/2">8.0</div>
                </div>

                <div className="flex rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/2">Nota Final</div>
                    <div className="w-1/2">7.9</div>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-end">
                <div className="flex justify-end gap-3">
                    <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Voltar a lista de alunos</button>

                    <button className="cursor-pointer rounded-sm border border-blue-600 bg-[#1C86EB] px-4 py-1 text-center text-sm text-white transition hover:bg-[#50AAFF]">Visualização por simulado</button>
                </div>
            </div>
        </div>

    )
}