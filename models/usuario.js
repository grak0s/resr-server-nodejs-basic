const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es Obligatorio"],
  },
  correo: {
    type: String,
    requered: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    requered: [true, "El password es  obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    unique: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: String,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuarios", UsuarioSchema);
