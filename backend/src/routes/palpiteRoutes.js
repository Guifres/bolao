const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middlewares/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// Criar palpite
router.post("/", authMiddleware, async (req, res) => {
    const { jogoId, placarCasa, placarFora } = req.body;

    try {
        const palpite = await prisma.palpite.create({
            data: {
                usuarioId: req.user.id,
                jogoId,
                placarCasa,
                placarFora,
            },
        });

        res.json(palpite);
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar palpite" });
    }
});

// Gerar ranking
router.get("/ranking", async (req, res) => {
    try {
        const ranking = await prisma.palpite.groupBy({
            by: ["usuarioId"],
            _sum: { pontos: true },
            orderBy: { _sum: { pontos: "desc" } },
            take: 10,
        });

        res.json(ranking);
    } catch (err) {
        res.status(500).json({ error: "Erro ao gerar ranking" });
    }
});

module.exports = router;
