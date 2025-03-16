const pool = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { nome, email, telefone, cpf, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    try {
        const novoUsuario = await pool.query(
            'INSERT INTO users (nome, email, telefone, cpf, senha_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, email',
            [nome, email, telefone, cpf, senhaHash]
        );
        res.status(201).json(novoUsuario.rows[0]);
    } catch (error) {
        res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Erro no login" });
    }
};
