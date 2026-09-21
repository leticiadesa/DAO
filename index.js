import express from "express";
import { inserirResultado } from "./DAO/resultado/inserir_resultado.js";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {

    res.json({
        mensagem: "API do Quiz funcionando!"
    });

});


app.post("/resultado", async (req, res) => {

    try {

        const {
            nome,
            pontos,
            total_questoes,
            resultado
        } = req.body;

        const dados = {
            nome,
            pontos,
            total_questoes,
            resultado
        };

        const resposta = await inserirResultado(dados);

        res.status(201).json({
            mensagem: "Resultado salvo com sucesso!",
            id: resposta.insertId
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao salvar o resultado."
        });

    }

});


app.listen(3000, () => {

    console.log("Servidor rodando em http://localhost:3000");

});