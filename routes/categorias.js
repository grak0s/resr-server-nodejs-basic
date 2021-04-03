const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//obtener todas las categorias
router.get("/");

//obtener una las categorias
router.get("/:id");

//crear las categorias=cualquier persona con un token valido
router.post("/");

//actualizar categorias
router.put("/:id");

//borrar categoria - admin
router.delete("/");

module.exports = router;
