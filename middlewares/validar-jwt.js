const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "no hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuarui que corresponde el uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no Valido - Usuario No existe",
      });
    }

    //verificar si el uid no esta marcado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no Valido - Usuario Inactivo",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
