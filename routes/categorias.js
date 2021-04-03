const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const { existeCategoriaPorId } = require("../helpers/db-validator");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

//obtener todas las categorias
router.get("/", obtenerCategorias);

//obtener una las categorias
router.get(
  "/:id",
  [
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

//crear las categorias=cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obigatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//actualizar categorias
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "el nombre es obligatoria").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

//borrar categoria - admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
