const { Schema, model } = require("mongoose");

const GeneroSchema = Schema({
    nombre : {
        type : String,
        required : [true, 'Nombre requerido'],
        unique : [true, 'Ya existe este género'],
        minLength : 2
    },
    estado : {
        type : Boolean,
        default : true
    },
    fechaCreacion : {
        type : Date,
        default : new Date()
    },
    fechaActualizacion : {
        type : Date
    },
    descripcion : {
        type: String
    }
})

module.exports = model('Genero', GeneroSchema)