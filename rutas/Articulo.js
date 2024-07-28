const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");

//ruta
router.post("/crear", ArticuloControlador.crear);

module.exports = router;