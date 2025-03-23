// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user; // Armazena o usuário no objeto da requisição
    next();
  });
}

module.exports = authenticate;
