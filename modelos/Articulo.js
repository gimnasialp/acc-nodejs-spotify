const {Schema, model} = require("mongoose");

const ArticuloSchema = Schema({
        titulo:{
            type: String,
            require :true
        },
        contenido:{           
            type: String,
            require :true
        },
        fecha:{
            type: Date,
            default: Date.now
 
        },
        imagen: String   
)}