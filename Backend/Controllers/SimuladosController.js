import Simulado from "../Models/Simulado.js";

export default class SimuladosController {

    static async findSimuladoByAlunoId(id) {
        return await Simulado.find({
            "conteudos.resultados.aluno_id": id
        });;
    }

    static async findSimuladoByDisciplinaId(id) {
        return await Simulado.find({
            disciplina_id: id
        });;
    }
}

