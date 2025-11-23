import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { getDesempenhoAluno } from "../api/usuariosapi";

export default function AlunoDesempenho() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dados, setDados] = useState([
    { bimestre: 1, media: 0 },
    { bimestre: 2, media: 0 },
    { bimestre: 3, media: 0 },
    { bimestre: 4, media: 0 },
  ]);

  const [alunoInfo, setAlunoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bimestreSelecionado, setBimestreSelecionado] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        const res = await getDesempenhoAluno(id);

        setAlunoInfo({
            nome: res.data.alunoNome ?? "Desconhecido",
            turma: res.data.turmaNome ?? "Não informado"
        });

        const desempenho = res.data.desempenho ?? [];

        const preenchido = [1, 2, 3, 4].map(bi => {
          const found = desempenho.find(d => Number(d.bimestre) === bi);
          return { bimestre: bi, media: found?.media ? Number(found.media) : 0 };
        });

        setDados(preenchido);

      } catch (err) {
        console.error("Erro ao buscar desempenho:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const categories = ["1º Bi", "2º Bi", "3º Bi", "4º Bi"];
  const valores = dados.map(d => d.media);

  const options = {
    chart: { id: "desempenho-aluno", toolbar: { show: false } },
    xaxis: { categories },
    yaxis: {
      max: 10,
      tickAmount: 5,
      labels: { formatter: v => Number(v).toFixed(1) }
    },
    plotOptions: {
      bar: { distributed: true, borderRadius: 8, columnWidth: "50%" }
    },
    dataLabels: { enabled: false },
    colors: valores.map((v, i) =>
      (i + 1) === bimestreSelecionado ? "#1778F2" : "#CFE9FF"
    )
  };

  const series = [{ name: "Média", data: valores }];

  return (
    <div className="p-6 max-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Desempenho do aluno por bimestre</h1>

        <p className="text-gray-600 mb-4">
            Aluno: <strong>{alunoInfo?.nome ?? "..."}</strong>  
            &nbsp;&nbsp;
            Turma: <strong>{alunoInfo?.turma}</strong>
        </p>

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div>
          <select
            className="border px-3 py-2 rounded"
            value={bimestreSelecionado}
            onChange={(e) => setBimestreSelecionado(Number(e.target.value))}
          >
            <option value={1}>1º Bimestre</option>
            <option value={2}>2º Bimestre</option>
            <option value={3}>3º Bimestre</option>
            <option value={4}>4º Bimestre</option>
          </select>
        </div>
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
