const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/pagar", async (req, res) => {
    const { nome, email, cpf, valor } = req.body;

    try {
        const response = await axios.post(
            "https://sandbox.asaas.com/api/v3/payments",
            {
                customer: { name: nome, email, cpf },
                billingType: "PIX",
                value: valor,
                dueDate: new Date().toISOString().split("T")[0],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "access_token": process.env.ASAAS_API_KEY,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao processar pagamento" });
    }
});

module.exports = router;
