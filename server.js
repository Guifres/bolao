const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const palpitesRoutes = require('./routes/palpites');
const pagamentosRoutes = require('./routes/pagamentos');
const db = require('./database');  // Conexão com PostgreSQL

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/palpites', palpitesRoutes);
app.use('/pagamentos', pagamentosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
