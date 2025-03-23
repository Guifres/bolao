const express = require('express');
const router = express.Router();
const { registrarPalpite, listarPalpites } = require('../controllers/palpitesController');

router.post('/registrar', registrarPalpite);
router.get('/listar', listarPalpites);

module.exports = router;
