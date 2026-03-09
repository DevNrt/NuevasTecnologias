// controllers/productController.js  — CRUD de productos
const Product = require('../models/Product');

// GET /api/products  — Público: todos los productos activos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ activo: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error obteniendo productos', error: error.message });
  }
};

// GET /api/products/:id  — Público
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.activo)
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error', error: error.message });
  }
};

// POST /api/products  — Solo admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ mensaje: 'Producto creado', product });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error creando producto', error: error.message });
  }
};

// PUT /api/products/:id  — Solo admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto actualizado', product });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error actualizando', error: error.message });
  }
};

// DELETE /api/products/:id  — Solo admin (soft delete)
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { activo: false });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error eliminando', error: error.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
