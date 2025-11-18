export default function NotasForms({ actionTitle }) {

    return (
        <form>

            <div>
                <div className="mb-2 flex justify-between">
                    <p className="text-xl text-gray-800">{aluno.nome}</p>

                    <p className="rounded-sm border border-gray-300 bg-gray-50/20 px-5 py-1 text-lg text-gray-800">Simulado {simulado.numero}</p>
                </div>

                <div className="flex gap-2 rounded-sm border border-gray-300 bg-gray-100 p-2">
                    <div className="w-1/3">Disciplina</div>
                    <div className="w-1/3">Professor</div>
                    <div className="w-1/3">Resultado</div>
                </div>

                <div className="mb-5">
                    <div className="mt-2 flex items-center gap-2 rounded-sm border border-gray-200 bg-white p-2">
                        <div className="w-1/3">Fisica</div>
                        <div className="w-1/3">Rô</div>
                        <div className="flex w-1/3 items-center gap-3">
                            <input type="text" className="rounded-sm border border-gray-300 px-2" placeholder="Digite o numero de resultados" />
                            <p>/ simulado.num_questoes</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-2 rounded-sm border border-gray-200 bg-gray-50/20 px-2 py-2 text-sm">
                        <p>Aluno Nº 1 de simulado.num_aluno</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="cursor-pointer rounded-sm border border-gray-300 bg-white px-3 py-1 text-center text-sm text-gray-800 transition hover:bg-gray-200">Voltar</button>

                        <button type='submit' vclassName="cursor-pointer rounded-sm border border-blue-600 bg-[#1C86EB] px-7 py-1 text-center text-sm text-white transition hover:bg-[#50AAFF]">{actionTitle}</button>
                    </div>
                </div>
            </div>

        </form>
    )
}