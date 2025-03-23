require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Roteadores
const userRoutes = require('./src/routes/userRoutes');
const betRoutes = require('./src/routes/betRoutes');
const authRoutes = require('./src/routes/authRoutes');
const palpiteRoutes = require('./src/routes/palpiteRoutes');
const jogosRoutes = require('./src/routes/jogosRoutes');
const pagamentoRoutes = require('./src/routes/pagamentoRoutes');

const app = express();

// 

// Middleware
app.use(cors());
app.use(express.json());

// Roteadores
app.use('/api/users', userRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/palpites', palpiteRoutes);
app.use('/api/jogos', jogosRoutes);
app.use('/api/pagamentos', pagamentoRoutes);

// Iniciando o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
