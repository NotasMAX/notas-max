import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { getDesempenhoMaterias } from "../api/turmasapi";
import StyleTitle from '../styles/Title.module.css';


export default function TurmaAcertosPorMateria() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [materias, setMaterias] = useState([]);
  const [turmaInfo, setTurmaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bimestre, setBimestre] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getDesempenhoMaterias(id, bimestre);

        setMaterias(res.data.materias || []);
        setTurmaInfo(res.data.turma || null);

      } catch (err) {
        console.error("Erro ao buscar desempenho por matéria:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, bimestre]);

  const categorias = materias.map(m => m?.nome ?? "Indefinido");
  const valores = materias.map(m => Number(m?.media ?? 0));

  const maiorValor = valores.length > 0 ? Math.max(...valores) : 0;

  const options = {
    chart: { id: "acertos-materias", toolbar: { show: false } },
    xaxis: { categories: categorias },
    yaxis: {
      max: 10,
      tickAmount: 5,
      labels: { formatter: (v) => Number(v).toFixed(1) }
    },
    plotOptions: {
      bar: { distributed: true, borderRadius: 8, columnWidth: "45%" }
    },
    dataLabels: { enabled: false },
    colors: valores.map((v) =>
      v === maiorValor ? "#1778F2" : "#CFE9FF"
    )
  };

  const series = [{ name: "Média de acertos", data: valores }];

  return (
    <div className="p-6 max-2xl mx-auto">

      <h1 className={StyleTitle.titlePage}>Acertos da turma por matéria</h1>

      <p className="text-gray-600 mb-4">
        Turma:{" "}
        <strong>
          {turmaInfo ? `${turmaInfo.serie}º EM` : "..."}
        </strong>
      </p>

      <div className="flex justify-end mb-4">
        <select
          className="border px-3 py-2 rounded"
          value={bimestre}
          onChange={(e) => setBimestre(Number(e.target.value))}
        >
          <option value={1}>1º Bimestre</option>
          <option value={2}>2º Bimestre</option>
          <option value={3}>3º Bimestre</option>
          <option value={4}>4º Bimestre</option>
        </select>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <Chart options={options} series={series} type="bar" height={340} />
      )}

      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
