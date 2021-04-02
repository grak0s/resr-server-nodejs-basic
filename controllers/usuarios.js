const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = (req, res = response) => {
  const query = req.query;

  res.json({
    ok: true,
    msg: "get api- controllador",
    query,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });
  //verificar si el correo existe

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    ok: true,
    msg: "get api- controllador",
    id,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    ok: true,
    msg: "get api- controllador",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    ok: true,
    msg: "get api- controllador",
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
