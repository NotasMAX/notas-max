import mongoose from "../DB/conn.js";

const { Schema } = mongoose;

const TurmaSchema = new Schema({
    serie: {
        type: Number,
        required: true,
    },
    ano: {
        type: Number,
        required: true,
    },
    alunos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Usuarios",
        },
    ],
    professores: [
        {
            professor_id: {
                type: Schema.Types.ObjectId,
                ref: "Usuarios",
            },
            materias: [
                {
                    materia_id: {
                        type: Schema.Types.ObjectId,
                        ref: "Materias",
                    },
                },
            ],
        },
    ],
}, { timestamps: true, strict: true });

const Turma = mongoose.model("Turmas", TurmaSchema);
export default Turma;