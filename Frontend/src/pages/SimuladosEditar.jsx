import { useNavigate } from "react-router-dom";
import SimuladosEditarForm from "../components/SimuladosEditarForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Style from "../styles/SimuladosCadastrar.module.css";
import { getOneSimple as getOne, updateSimulado } from "../api/simuladoApi";
import StyleTitle from "../styles/Title.module.css";
import { getOne as getOneTurma } from "../api/turmasapi";

export default function SimuladosEditar() {
  const { id } = useParams();
  const [simulado, setSimulado] = useState(null);

  useEffect(() => {
    document.title = "NotasMAX - Editar Simulado";
  }, []);

  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSimulado = async () => {
    try {
      const result = await getOne(id);
      const simulado = result.data.simulado;
      const isEditable =
        Date.now() - new Date(simulado.createdAt).getTime() <
        16 * 24 * 60 * 60 * 1000;
      if (!isEditable) {
        navigate(`/Simulados/`, { replace: true });
        setLoading(false);
        return;
      }

      setSimulado(simulado);
    } catch (error) {
      navigate(`/Simulados/`, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSimulado();
  }, [id]);

  const handleEdit = async (formData) => {
    try {
      const result = await updateSimulado(id, formData);
      const turma = await getOneTurma(simulado.turma_id);
      navigate(
        `/Simulados/${formData.bimestre}/${turma.data.turma.ano}/${turma.data.turma.serie}`,
        {
          state: {
            message: result.data?.message || "Simulado atualizado com sucesso",
            type: "success",
          },
        }
      );
    } catch (error) {
      setResponse({
        success: false,
        message: error.response?.data?.message || "Erro ao editar simulado",
      });
    }
  };

  return loading ? (
    <p>Carregando...</p>
  ) : !simulado ? (
    <p>Simulado não encontrado ou expirou...</p>
  ) : (
    <div className={Style.SimuladosCadastrarContainer}>
      <h2 className={StyleTitle.titlePag}>Editar Simulado</h2>
      <SimuladosEditarForm
        onSubmit={handleEdit}
        response={response}
        simulado={simulado}
      />
    </div>
  );
}
