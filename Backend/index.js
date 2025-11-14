import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";
import RoutesSimulado from './Routes/RoutesSimulado.js';

const app = new express();

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

app.use("/NotasMax", routes);
app.use("/NotasMax", RoutesSimulado);
app.listen(5000);