import multer from "multer";
import xlsx from "xlsx";
import mongoose from "../DB/conn.js";

const upload = multer({ dest: "uploads/" });

async function importarNotas(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const workbook = xlsx.readFile(req.file.path);

    const raw = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const linhas = raw.filter(l => l.some(c => c !== undefined && c !== null && c !== ""));

    const bimestreLinha = linhas.find(l => l[0]?.toString().toLowerCase().includes("bimestre"));
    const bimestre = bimestreLinha ? bimestreLinha[0] : "Sem identificação";

    const indexCabecalho = bimestreLinha ? linhas.indexOf(bimestreLinha) + 1 : 0;
    const cabecalho = linhas[indexCabecalho];

    const simulados = linhas.slice(indexCabecalho + 1).map(linha => {
      const nome = linha[0] ?? null;
      const notas = {};

      for (let i = 1; i < cabecalho.length - 1; i++) {
        notas[cabecalho[i]] = linha[i];
      }

      return {
        nome,
        notas,
        total: linha[cabecalho.length - 1]
      };
    });

    const documento = {
      bimestre,
      simulados,
      criado_em: new Date()
    };

    const db = mongoose.connection.db;
    const collection = db.collection("importacoes");
    await collection.insertOne(documento);

    res.json({
      message: "Importação estruturada com sucesso!",
      bimestre,
      total_simulados: "6"
    });

  } catch (err) {
    console.error("Erro ao importar planilha:", err);
    res.status(500).json({ error: "Erro ao importar planilha" });
  }
}

export { upload, importarNotas };
