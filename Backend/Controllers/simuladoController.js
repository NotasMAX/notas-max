import Simulado from "../Models/Simulado.js";

export default class simuladoController {

    static async criarSimulado(req, res) {
        const { numero, tipo, bimestre, data_realizacao, turma_id } = req.body;
        if (!numero || !tipo || !bimestre || !data_realizacao || !turma_id) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        try {
            const simulado = new Simulado({ numero, tipo, bimestre, data_realizacao, turma_id });
            await simulado.save();
            res.status(201).json({ message: "Simulado criado com sucesso", simulado });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar simulado", error: error.message });
        }
    }// fim do criarSimulado

    static async listarSimulados(req, res) {
        try {
            const simulados = await Simulado.find();
            res.status(200).json(simulados);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar simulados", error: error.message });
        }
    }// fim do listarSimulados

    static async editarSimulado(req, res) {
        const { id } = req.params;
        const { numero, tipo, bimestre, data_realizacao, turma_id } = req.body;

        try {
            const simulado = await Simulado.findByIdAndUpdate(id, { numero, tipo, bimestre, data_realizacao, turma_id }, { new: true });
            if (!simulado) {
                return res.status(404).json({ message: "Simulado não encontrado" });
            }
            res.status(200).json({ message: "Simulado atualizado com sucesso", simulado });
        } catch (error) {
            res.status(500).json({ message: "Erro ao editar simulado", error: error.message });
        }
    }// fim do editarSimulado
}