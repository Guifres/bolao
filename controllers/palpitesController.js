const db = require('../database');

const registrarPalpite = (req, res) => {
    const { nome, telefone, palpites } = req.body;

    if (!nome || !telefone || !palpites) {
        return res.status(400).json({ mensagem: 'Dados incompletos.' });
    }

    const query = `INSERT INTO palpites (nome, telefone, palpites) VALUES ($1, $2, $3) RETURNING *`;
    const values = [nome, telefone, JSON.stringify(palpites)];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao registrar palpite:', err);
            return res.status(500).json({ mensagem: 'Erro ao registrar palpite.' });
        }

        res.json({ mensagem: 'Palpite registrado com sucesso!', palpite: result.rows[0] });
    });
};

const listarPalpites = (req, res) => {
    const query = `SELECT * FROM palpites`;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao buscar palpites:', err);
            return res.status(500).json({ mensagem: 'Erro ao buscar palpites.' });
        }

        res.json(result.rows.map(row => ({
            id: row.id,
            nome: row.nome,
            telefone: row.telefone,
            palpites: JSON.parse(row.palpites),
            data: row.data
        })));
    });
};

module.exports = { registrarPalpite, listarPalpites };

