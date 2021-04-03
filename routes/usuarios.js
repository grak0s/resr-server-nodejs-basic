const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],

  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es Valido").isEmail(),
    check("correo").custom(emailExiste),
    //check("rol", "no es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
