const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");
const multer = require("multer");

const almacenamiento = multer.diskStorage({
    destination : function(req,res,cb) {
        cb(null, './controladores/imagees/articulos');
    },
    filename: function(req,file,cb) {
        cb(null, "articulo"+Date.now() + file.originalname);
    }
})

const subidas = multer({storage:almacenamiento});

//ruta
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos", ArticuloControlador.listar);

router.get("/articuloslimit/:ultimos?", ArticuloControlador.listar);

router.get("/articulos/:id?", ArticuloControlador.uno);
router.delete("/articulos/:id", ArticuloControlador.eliminar);
router.put("/articulos/:id", ArticuloControlador.editar);
router.post("/subir-imagen/:id",[subidas.single("file0")], ArticuloControlador.subir);


module.exports = router;