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
app.use(express.json()); // esto es para recibir datos con content-type application-json
app.use(express.urlencoded({extended:true})) //form-urlencoded - postman
//creo rutas
app.get("/probando",(req,res) => {
    console.log("se ejecuto get probando")
    //debo devolver algo, sino queda loop, puedo sendear codigo html <div> o jjson
    return res.status(200).send({
        "curso":"node"
    })

});
//crea servidor y escucha peticiones http
app.listen(puerto,()=> {
    console.log("servido corriend en puerto "+puerto);
});


//RUTAS
const rutas_articulo = require("./rutas/Articulo");

//cargo rutas
app.use("/api",rutas_articulo);

