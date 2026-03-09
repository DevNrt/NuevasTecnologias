// controllers/authController.js  — Registro, login y perfil
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Genera un JWT firmado con el ID del usuario
const generarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password)
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });

    const existe = await User.findOne({ email });
    if (existe)
      return res.status(400).json({ mensaje: 'El email ya está registrado' });

    // El primer usuario registrado se convierte en admin automáticamente
    const totalUsuarios = await User.countDocuments();
    const rol = totalUsuarios === 0 ? 'admin' : 'cliente';

    const usuario = await User.create({ nombre, email, password, rol });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token: generarToken(usuario._id),
      usuario,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });

    const usuario = await User.findOne({ email });
    if (!usuario)
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const passwordCorrecta = await usuario.compararPassword(password);
    if (!passwordCorrecta)
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    res.json({
      mensaje: 'Bienvenido/a, ' + usuario.nombre,
      token: generarToken(usuario._id),
      usuario,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
};

// GET /api/auth/me  (ruta protegida)
const getMe = async (req, res) => {
  res.json({ usuario: req.usuario });
};

module.exports = { register, login, getMe };
