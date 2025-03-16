require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const betRoutes = require('./src/routes/betRoutes')

const app = express()
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/bets', betRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});