const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");

//ruta
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos", ArticuloControlador.listar);

router.get("/articuloslimit/:ultimos?", ArticuloControlador.listar);
module.exports = router;