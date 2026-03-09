// server.js  — Punto de entrada del backend ShopCo
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');

// ── Conexión a MongoDB ────────────────────────────────────────────
connectDB();

const app = express();

// ── Middlewares globales ──────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());

// ── Rutas de la API ───────────────────────────────────────────────
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));

// ── Health check (Azure lo usa para verificar que el servidor vive)
app.get('/health', (req, res) => res.json({ status: 'OK', servicio: 'ShopCo API' }));

// ── Manejo de rutas no encontradas ────────────────────────────────
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));

// ── Inicio del servidor ───────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
