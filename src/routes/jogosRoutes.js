const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/resultados", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.api-futebol.com.br/v1/campeonatos/10/partidas`,
            {
                headers: {
                    "Authorization": `Bearer ${process.env.FUTEBOL_API_KEY}`,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar jogos" });
    }
});

module.exports = router;
