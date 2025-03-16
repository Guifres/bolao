const express = require('express');
const router = express.Router();

// Rota para pegar todas as apostas
router.get('/bets', (req, res) => {
    // Aqui você pode adicionar lógica para buscar as apostas no banco de dados
    res.json({ message: "Aqui estão todas as apostas." });
});

// Rota para criar uma nova aposta
router.post('/bet', (req, res) => {
    // Aqui você pode adicionar a lógica para criar uma nova aposta
    const betData = req.body; // Dados da aposta enviados no corpo da requisição
    res.status(201).json({ message: "Aposta criada com sucesso!", bet: betData });
});

// Rota para atualizar uma aposta existente
router.put('/bet/:id', (req, res) => {
    const { id } = req.params;
    const updatedBet = req.body;
    // Lógica para atualizar a aposta no banco de dados usando o id
    res.json({ message: `Aposta com ID ${id} atualizada.`, updatedBet });
});

// Rota para excluir uma aposta
router.delete('/bet/:id', (req, res) => {
    const { id } = req.params;
    // Lógica para excluir a aposta com o ID fornecido
    res.json({ message: `Aposta com ID ${id} deletada.` });
});

module.exports = router;
