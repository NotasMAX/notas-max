import mongoose from "../DB/conn.js";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefone_contato: {
        type: String,
        required: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    tipo_usuario: {
        type: String,
        enum: ["aluno", "professor", "administrador"],
        default: "aluno"
    },
    telefone_responsavel: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    strict: true
});

const Usuario = mongoose.model("Usuarios", usuarioSchema);
export default Usuario;