const validar = require("validator");
const Articulo = require("../modelos/Articulo");

const crear = (req,res ) => {

    //extraigo datos de body
    let parametros = req.body;

    //vallidar datos
    try{
        let val_titulo= !validar.isEmpty(parametros.titulo);
        let val_contenido= !validar.isEmpty(parametros.contenido);
        if(!val_titulo || !val_contenido){
            throw new Error("info no validada");
        }

    }catch(error){      
        return res.status(400).json({
            status: "error",
            mensaje: "falta revisar datos"
        })  
    }

    //crear objeto a guardar . mongoose
    const articulo = new Articulo(parametros);

    //asigno valores al objeto basado en el modelo 
   // articulo.titulo = parametros.titulo; manera manual

   //guardo en la db
   articulo.save()
   .then((articuloGuardado) => {
       return res.status(200).json({
           status: 'success',
           Articulo: articuloGuardado,
           mensaje: 'Articulo creado con exito'
       });
   })
   .catch((error) => {
       return res.status(400).json({
           status: 'error',
           mensaje: 'No se ha guardado el articulo: ' + error.message
       });
   });


 
}

module.exports = {
    crear
}