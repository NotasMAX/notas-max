export default function CardSimulado({ simulado, onView }) {

    return (
        <div class="flex w-1/2 items-center justify-between rounded-lg border-1 border-gray-300 bg-white px-3 py-3">
            <p>Simulado {simulado.numero}</p>

            <p>{simulado.data_realizacao}</p>

            <button class="rounded-sm border-1 border-gray-300 p-1" onClick={() => (onView)}>ver mais</button>
        </div>
    )
}