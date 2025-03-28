// database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
    } else {
        console.log('Conectado ao PostgreSQL!');
    }
});

module.exports = pool;
