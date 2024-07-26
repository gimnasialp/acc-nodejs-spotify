const {conexion} = require("./database/conexion");
const express = require("express");
const cors = require("cors");
console.log("arranque -");
//conexion db
conexion();
//crear servidor node
const app = express();
const puerto= 3900;
//confuguro cors
app.use(cors()); //ejecuta cors antes que las rutas

//convrtir body a objeto js
app.use(express.json());
//creo rutas

//crea servidor y escucha peticiones http
app.listen(puerto,()=> {
    console.log("servido corriend en puerto "+puerto);
});