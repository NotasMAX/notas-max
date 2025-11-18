
import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";
import authRoutes from "./Routes/AuthRoute.js";
import "./DB/conn.js"; 

const app = express();

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

app.use("/NotasMax/Auth", authRoutes);
app.use("/NotasMax", routes);

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));