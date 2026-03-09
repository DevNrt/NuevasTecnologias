// middleware/auth.js  — Verifica JWT y adjunta usuario a req
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── Verifica que el token JWT sea válido ──────────────────────────
const protect = async (req, res, next) => {
  let token;

  // El token viene en el header: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado: token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adjunta el usuario (sin contraseña) al request
    req.usuario = await User.findById(decoded.id).select('-password');
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

// ── Verifica que el usuario sea administrador ─────────────────────
const soloAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') return next();
  return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol admin' });
};

module.exports = { protect, soloAdmin };
