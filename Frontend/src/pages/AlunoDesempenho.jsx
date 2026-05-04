import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { getDesempenhoAluno } from "../api/usuariosapi";
import StyleTitle from '../styles/Title.module.css';
import StyleButton from '../styles/ButtonGroup.module.css';

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

  const [turmasAluno, setTurmasAluno] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [bimestreSelecionado, setBimestreSelecionado] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const res = await getDesempenhoAluno(
          id,
          anoSelecionado || undefined,
          undefined
        );

        setAlunoInfo({
          nome: res.data.alunoNome ?? "Desconhecido",
          turma: res.data.turmaNome ?? "Não informado",
        });

        setTurmasAluno(res.data.turmasDoAluno);

        if (!anoSelecionado && res.data.turmasDoAluno?.length > 0) {
          const ultimoAno = res.data.turmasDoAluno.at(-1).ano;
          setAnoSelecionado(ultimoAno);
        }

        setDados(res.data.desempenho);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, anoSelecionado]);

  const categories = ["1º Bi", "2º Bi", "3º Bi", "4º Bi"];
  const valores = dados.map((d) => d.media);

  const options = {
    chart: { id: "desempenho-aluno", toolbar: { show: false } },
    xaxis: { categories },
    yaxis: {
      max: 10,
      tickAmount: 5,
      labels: { formatter: (v) => Number(v).toFixed(1) },
    },
    plotOptions: {
      bar: { distributed: true, borderRadius: 8, columnWidth: "50%" },
    },
    dataLabels: { enabled: false },
    colors: valores.map((v, i) =>
      i + 1 === bimestreSelecionado ? "#1778F2" : "#CFE9FF"
    ),
  };

  const series = [{ name: "Média", data: valores }];

  return (
    <div>
      <h1 className={StyleTitle.titlePage}>Desempenho do aluno por bimestre</h1>

      <p className={StyleTitle.subtitlePage}>
        Aluno: <strong>{alunoInfo?.nome ?? "..."}</strong>
        &nbsp;&nbsp;
        Turma atual: <strong>{alunoInfo?.turma}</strong>
      </p>

      <div className="flex justify-end items-center mb-4 gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(Number(e.target.value))}
        >
          <option value="">Selecione o ano</option>
          {turmasAluno.map((t) => (
            <option key={t.id} value={t.ano}>
              {t.serie}º Ano - {t.ano}
            </option>
          ))}
        </select>

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

      <div style={{ height: 340 }}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              Carregando...
            </div>
          ) : (
            <Chart options={options} series={series} type="bar" height={340} />
          )}
      </div>

      <div className="mt-6 flex justify-end">
        <button className={StyleButton.buttonPrimary} onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </div>
  );
}
