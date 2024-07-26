const moongoose = require("mongoose");

const conexion = async () => {
try{
    await moongoose.connect("mongodb://127.0.0.1:27017/mi_blog");

}catch(error){
    console.log(error);
    throw new Error("no conexion db");
}

}

module.exports={
    conexion
}