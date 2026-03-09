// models/Order.js  — Modelo de Pedido con detalles embebidos
const mongoose = require('mongoose');

const detalleSchema = new mongoose.Schema({
  producto:       { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  nombreProducto: { type: String, required: true },
  cantidad:       { type: Number, required: true, min: 1 },
  precioUnitario: { type: Number, required: true },
  subtotal:       { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:   [detalleSchema],
    total:   { type: Number, required: true },
    estado:  {
      type: String,
      enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
      default: 'pendiente',
    },
    metodoPago: { type: String, default: 'tarjeta' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
