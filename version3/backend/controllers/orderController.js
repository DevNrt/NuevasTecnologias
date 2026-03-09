// controllers/orderController.js  — Pedidos
const Order   = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  — Cliente autenticado crea un pedido
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;  // [{ productoId, cantidad }]

    if (!items || items.length === 0)
      return res.status(400).json({ mensaje: 'El carrito está vacío' });

    let total = 0;
    const detalles = [];

    for (const item of items) {
      const product = await Product.findById(item.productoId);
      if (!product) return res.status(404).json({ mensaje: `Producto ${item.productoId} no encontrado` });
      if (product.stock < item.cantidad) return res.status(400).json({ mensaje: `Stock insuficiente: ${product.nombre}` });

      const subtotal = product.precio * item.cantidad;
      total += subtotal;
      detalles.push({
        producto: product._id,
        nombreProducto: product.nombre,
        cantidad: item.cantidad,
        precioUnitario: product.precio,
        subtotal,
      });

      // Descuenta stock
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -item.cantidad } });
    }

    const order = await Order.create({
      usuario: req.usuario._id,
      items: detalles,
      total,
    });

    res.status(201).json({ mensaje: 'Pedido creado exitosamente', order });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error creando pedido', error: error.message });
  }
};

// GET /api/orders/mis-pedidos  — Historial del cliente
const getMisPedidos = async (req, res) => {
  try {
    const orders = await Order.find({ usuario: req.usuario._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error', error: error.message });
  }
};

// GET /api/orders  — Admin: todos los pedidos
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('usuario', 'nombre email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error', error: error.message });
  }
};

// PUT /api/orders/:id/estado  — Admin: actualiza estado
const updateEstado = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    if (!order) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    res.json({ mensaje: 'Estado actualizado', order });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error', error: error.message });
  }
};

module.exports = { createOrder, getMisPedidos, getAllOrders, updateEstado };
