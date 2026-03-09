// models/Product.js  — Modelo de Producto
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre:      { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    precio:      { type: Number, required: true, min: 0 },
    stock:       { type: Number, required: true, default: 0, min: 0 },
    categoria:   { type: String, required: true },
    icon:        { type: String, default: '📦' },
    rating:      { type: Number, default: 0, min: 0, max: 5 },
    reviews:     { type: Number, default: 0 },
    activo:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
