import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";

const app = new express();

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: ["http://localhost:30080"]
}))

app.use("/NotasMax", routes);

app.listen(5000);