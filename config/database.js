const {Pool} = require('pg');
require('dotenv').config();

const Pool = new Poll({
    user: process.env.DB_USER,
    host: process.env,DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.BD_PASS,
    port: process.env.BD_PORT
});

module.exports = Pool;