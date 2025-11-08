import { useState } from "react";
import axios from "axios";

export default function ImportarNotas() {
  const [arquivo, setArquivo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleArquivo = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!arquivo) {
      setMensagem("Selecione um arquivo Excel (.xlsx)");
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    try {
      setCarregando(true);
      const { data } = await axios.post(
        "http://localhost:5000/NotasMax/Importar",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResultado(data);
      setMensagem("");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao importar o arquivo.");
    } finally {
      setCarregando(false);
    }
  };

  const handleConfirmar = async () => {
    try {
      setCarregando(true);
      const { data } = await axios.post(
        "http://localhost:5000/NotasMax/Confirmar"
      );
      setMensagem(data.message || "Importação confirmada com sucesso!");
      setResultado(null);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao confirmar a importação.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold">Importando notas do Excel</h2>

        <div className="text-lg font-semibold px-4 py-2 rounded-lg shadow">
          2º Bimestre - 2025
        </div>
      </div>

      <p className="text-lg text-gray-700 mb-2">
        As notas serão importadas para o aluno e sua turma informados abaixo:
      </p>

      <div className="flex items-center gap-10 mb-10">
        <h3 className="text-xl font-semibold">
          Aluno: <span className="font-normal text-gray-800">Maria Silva</span>
        </h3>
        <h3 className="text-xl font-semibold">
          Turma: <span className="font-normal text-gray-800">1º</span>
        </h3>
      </div>

      <div
        className="border-2 border-dashed border-gray-300 bg-white rounded-2xl shadow-lg h-96 flex flex-col items-center justify-center text-center cursor-pointer transition hover:border-blue-400 hover:bg-blue-50 relative"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleArquivo}
        />

        {!arquivo ? (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Selecione o arquivo</span> que será
              importado<br />ou arraste e solte aqui
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-blue-500 mb-3"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 2H8a2 2 0 00-2 2v16a2 2 0 002 2h11a2 2 0 002-2V4a2 2 0 00-2-2zm-3 14H9v-2h7v2zm0-4H9v-2h7v2z" />
            </svg>
            <p className="text-lg text-gray-700 font-medium">{arquivo.name}</p>
          </div>
        )}
      </div>

      {mensagem && (
        <p className="text-center text-red-600 mt-4 font-medium">{mensagem}</p>
      )}

      <div className="flex justify-end mt-8 gap-4">
        <button
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          onClick={() => window.history.back()}
        >
          Voltar
        </button>
        <button
          onClick={!arquivo ? handleUpload : handleConfirmar}
          disabled={carregando}
          className={`px-5 py-2 rounded-lg text-white transition ${
            arquivo
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          {carregando
            ? "Processando..."
            : arquivo
            ? "Confirmar"
            : "Enviar arquivo"}
        </button>
      </div>
    </div>
  );
}

