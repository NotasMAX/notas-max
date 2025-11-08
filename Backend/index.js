import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";

const app = express(); // ✅ sem "new"

// Permite JSON no corpo das requisições
app.use(express.json());

// Configura o CORS para permitir o frontend no localhost:5173
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

// Prefixo das rotas principais
app.use("/NotasMax", routes);

// Inicializa o servidor
app.listen(5000, () => {
  console.log("🚀 Servidor rodando na porta 5000");
});
