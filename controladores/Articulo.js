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
const listar = (req, res) => {
    //limitar
    //Articulo.find({}).limit(3);  VER QUE HAY MAS limitadores y sort en MOONGOOSE docs
    Articulo.find({})
  
      .then((articulos) => {
  
        if (!articulos) {
  
          return res.status(404).json({
  
            status: "error",
  
            mensaje: "No se han encontrado articulos",
  
          });
  
        }
  
        return res.status(200).send({
  
          status: "success",
          param: req.params.ultimos,
          articulos,
  
        });
  
      })
  
      .catch((error) => {
  
        return res.status(500).json({
  
          status: "error",
  
          mensaje: "Ha ocurrido un error al listar los articulos",
  
          error: error.message,
  
        });
  
      });
  
  };



  const uno = (req, res) => {
    let id = req.params.id;
    
    Articulo.findById(id).
  
      then((articulo) => {
  
        if (!articulo) {
  
          return res.status(400).json({
  
            status: "error",
  
            mensaje: "No se han encontrado articulo",
  
          });
  
        }
  
        return res.status(200).send({
  
          status: "success",
          articulo
  
        });
  
      })
  
      .catch((error) => {
  
        return res.status(500).json({
  
          status: "error",
  
          mensaje: "Ha ocurrido un error al listar los articulos",
  
          error: error.message,
  
        });
  
      });
  
  };


  const eliminar = (req, res) => {
    const id = req.params.id;
   
    Articulo.findOneAndDelete({ _id: id }) // Usamos _id como filtro
      .then((articuloEliminado) => {
        if (!articuloEliminado) {
          return res.status(404).json({
            status: "Error",
            message: "Articulo no encontrado",
          });
        }
        return res.status(200).json({
          status: "Success",
          message: "Articulo eliminado con éxito",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "Error",
          message: "Error al eliminar el artículo: " + error.message,
        });
      });
  };

  const editar = async (req, res) => {
    try {
        //  Recoger id articulo a editar
        let articuloId = req.params.id;
        // Recoger datos del body
        let parametros = req.body;
        // Validar datos
        let validar_titulo = !validar.isEmpty(parametros.titulo) &&
            validar.isLength(parametros.titulo, { min: 5, max: 15})
        let validar_contenido = !validar.isEmpty(parametros.contenido)
        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información revise que cumpla los terminos")
        }
 
        // Buscar y actualizar articulo
        let articuloActualizado = await Articulo.findOneAndUpdate({ _id: articuloId }, parametros)  
        if (!articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar",
            })
        }
        // Devolver respuesta
        return res.status(200).json({
            status: "success updated",
            mensaje: "Se ha actualizado correctamente",
            articulo: articuloActualizado
        })
        // Devolver respuesta
    } catch (error) {
        return res.status(400).json({
            status: "error",
            error,
            message: "Un error ha ocurrido mientras se editaba el articulo",
        });
    }
}

const subir = (req,res) => {
    console.log(req.file)

    return res.status(200).json({
        status: "success",
        files: req.file
    });
}

module.exports = {
    crear,
    listar,
    uno,
    eliminar,
    editar,
    subir
}