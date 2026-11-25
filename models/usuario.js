const { Schema, model } = require('mongoose')

const ROLES = ['admin', 'operario']

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        minLength: 2,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    password: {
        type: String,
        required: [true, 'Password requerido'],
        minLength: [6, 'Password mínimo 6 caracteres']
    },
    rol: {
        type: String,
        enum: {
            values: ROLES,
            message: 'Rol debe ser admin u operario'
        },
        default: 'operario'
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject()
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)
module.exports.ROLES = ROLES
