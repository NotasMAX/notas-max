import mongoose from "../DB/conn.js";

const { Schema } = mongoose;

const SimuladoResultadoSchema = new Schema({
    simulado_id: {
        type: Schema.Types.ObjectId,
        ref: "Simulados",
        required: true,
    },
    simulado_conteudo_id: {
        type: Schema.Types.ObjectId,
        ref: "SimuladosConteudo",
        required: true,
    },
    aluno_id: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    nota: {
        type: Number,
        required: true,
    },
    acertos: {
        type: Number,
        required: true,
    },
    notificacao_enviada: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, strict: true });

const SimuladoResultado = mongoose.model("SimuladosResultados", SimuladoResultadoSchema);
export default SimuladoResultado;