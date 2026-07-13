import express from "express";
import cors from "cors";
import "dotenv/config";

import pool from "./config/db.js";
import equipamentosRoutes from "./routes/equipamentos.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.send("API de Inventário funcionando!");
});

// Teste da conexão com o banco
app.get("/teste-db", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT NOW()");

        res.json({
            mensagem: "Conexão com o PostgreSQL realizada com sucesso!",
            horario: resultado.rows[0].now
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao conectar ao banco de dados."
        });
    }
});

// Rotas da API
app.use("/equipamentos", equipamentosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});