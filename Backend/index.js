
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./Routes/routes.js";
import authRoutes from "./Routes/AuthRoute.js";
import mongoose from "./DB/conn.js"; 

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:30080"]
}))

app.use("/NotasMax/Auth", authRoutes);
app.use("/NotasMax", routes);

// Aguardar conexão MongoDB estar pronta antes de iniciar servidor
mongoose.connection.once('connected', () => {
    app.listen(5000, () => console.log("✓ Servidor rodando na porta 5000"));
});

mongoose.connection.on('error', (err) => {
    console.error("✗ Erro de conexão MongoDB:", err.message);
    process.exit(1);
});

