// routes/orderRoutes.js
const express = require('express');
const router  = express.Router();
const { createOrder, getMisPedidos, getAllOrders, updateEstado } = require('../controllers/orderController');
const { protect, soloAdmin } = require('../middleware/auth');

router.post('/',              protect, createOrder);                       // Cliente
router.get ('/mis-pedidos',   protect, getMisPedidos);                     // Cliente
router.get ('/',              protect, soloAdmin, getAllOrders);            // Admin
router.put ('/:id/estado',    protect, soloAdmin, updateEstado);           // Admin

module.exports = router;
