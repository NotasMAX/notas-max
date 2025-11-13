
import mongoose from "../DB/conn.js";

const { Schema } = mongoose;

const SimuladoConteudoSchema = new Schema({
    materia_id: {
        type: Schema.Types.ObjectId,
        ref: "Materias",
        required: true,
    },
    professor_id: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    quantidade_questoes: {
        type: Number,
        default: 0,
        required: true,
    },
    peso: {
        type: Number,
        default: 1.0,
        required: true,
    },
    simulado_id: {
        type: Schema.Types.ObjectId,
        ref: "Simulados",
        required: true,
    }
}, { timestamps: true, strict: true });

const SimuladoConteudo = mongoose.model("SimuladosConteudo", SimuladoConteudoSchema);
export default SimuladoConteudo;

on