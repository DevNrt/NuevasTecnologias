// models/User.js  — Modelo de Usuario con roles
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    nombre:   { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    rol:      { type: String, enum: ['cliente', 'admin'], default: 'cliente' },
  },
  { timestamps: true }
);

// Hash de contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparar contraseña ingresada con el hash almacenado
userSchema.methods.compararPassword = async function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

// Excluir contraseña al serializar a JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
