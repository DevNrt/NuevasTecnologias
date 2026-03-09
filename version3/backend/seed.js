// seed.js  — Carga datos iniciales en MongoDB
// Ejecutar con: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');
const Product  = require('./models/Product');

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado a MongoDB...');

  // Limpia colecciones
  await User.deleteMany();
  await Product.deleteMany();

  // Crea usuario admin
  await User.create({
    nombre: 'Administrador',
    email: 'admin@shopco.com',
    password: 'admin123',
    rol: 'admin',
  });

  // Crea usuario cliente de prueba
  await User.create({
    nombre: 'Cliente Demo',
    email: 'cliente@shopco.com',
    password: 'cliente123',
    rol: 'cliente',
  });

  // Crea productos de ejemplo
  await Product.insertMany([
    {
      nombre: 'Mochila Urban Pro',
      descripcion: 'Mochila impermeable 30L con compartimento para laptop de 15". Fabricada con materiales reciclados.',
      precio: 189900,
      stock: 12,
      categoria: 'Accesorios',
      icon: '🎒',
      rating: 4.8,
      reviews: 124,
    },
    {
      nombre: 'Audífonos BassMax X3',
      descripcion: 'Inalámbricos con cancelación de ruido activa (ANC), Bluetooth 5.3 y batería de 30 horas.',
      precio: 324500,
      stock: 8,
      categoria: 'Electrónica',
      icon: '🎧',
      rating: 4.6,
      reviews: 89,
    },
    {
      nombre: 'Zapatillas Runner Elite',
      descripcion: 'Zapatillas deportivas con suela de amortiguación avanzada, ideales para running y gym. Disponibles en tallas 38-45.',
      precio: 259900,
      stock: 20,
      categoria: 'Calzado',
      icon: '👟',
      rating: 4.7,
      reviews: 203,
    },
    {
      nombre: 'Smartwatch FitPro S2',
      descripcion: 'Reloj inteligente con monitor de frecuencia cardíaca, GPS integrado, resistente al agua y batería de 7 días.',
      precio: 489900,
      stock: 15,
      categoria: 'Electrónica',
      icon: '⌚',
      rating: 4.5,
      reviews: 156,
    },
    {
      nombre: 'Chaqueta Softshell Wind',
      descripcion: 'Chaqueta cortavientos ligera con forro polar interior, ideal para actividades al aire libre en climas fríos.',
      precio: 219900,
      stock: 18,
      categoria: 'Ropa',
      icon: '🧥',
      rating: 4.4,
      reviews: 78,
    },
    {
      nombre: 'Botella Térmica ProHydro',
      descripcion: 'Botella de acero inoxidable 750ml, mantiene bebidas frías 24h y calientes 12h. Sin BPA y con tapa antigoteo.',
      precio: 79900,
      stock: 35,
      categoria: 'Accesorios',
      icon: '🍶',
      rating: 4.9,
      reviews: 312,
    },
    {
      nombre: 'Teclado Mecánico DarkType K7',
      descripcion: 'Teclado mecánico TKL con switches Red, retroiluminación RGB por tecla y estructura de aluminio.',
      precio: 379900,
      stock: 10,
      categoria: 'Electrónica',
      icon: '⌨️',
      rating: 4.7,
      reviews: 95,
    },
  ]);

  console.log('✅ Datos cargados exitosamente');
  console.log('   Admin:   admin@shopco.com   / admin123');
  console.log('   Cliente: cliente@shopco.com / cliente123');
  process.exit();
};

seedData().catch(console.error);
