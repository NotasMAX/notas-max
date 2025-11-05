import mongoose from "../DB/conn.js";

const { Schema } = mongoose;

const SimuladoSchema = new Schema({
    numero: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        enum: ["objetivo", "dissertativo"],
        required: true,
    },
    bimestre: {
        type: Number,
        required: true,
    },
    data_realizacao: {
        type: Date,
        required: true,
    },
    turma_id: {
        type: Schema.Types.ObjectId,
        ref: "Turmas",
        required: true,
    }
}, { timestamps: true, strict: true });

const Simulado = mongoose.model("Simulados", SimuladoSchema);
export default Simulado;