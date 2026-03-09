// routes/productRoutes.js
const express = require('express');
const router  = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, soloAdmin } = require('../middleware/auth');

router.get ('/',     getProducts);                            // Público
router.get ('/:id',  getProduct);                             // Público
router.post('/',     protect, soloAdmin, createProduct);      // Admin
router.put ('/:id',  protect, soloAdmin, updateProduct);      // Admin
router.delete('/:id',protect, soloAdmin, deleteProduct);      // Admin

module.exports = router;
