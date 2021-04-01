const { response, request } = require("express");

const usuariosGet = (req, res = response) => {
  const query = req.query;

  res.json({
    ok: true,
    msg: "get api- controllador",
    query,
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: body,
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
