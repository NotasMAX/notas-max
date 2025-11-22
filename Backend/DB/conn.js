import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/NotasMax";

mongoose.connect(mongoUrl)
    .then(() => console.log("✓ Conectou ao MongoDB"))
    .catch((err) => {
        console.error("✗ Erro ao conectar MongoDB:", err.message);
        process.exit(1);
    });

export default mongoose;