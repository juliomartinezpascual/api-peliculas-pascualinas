const Genero = require("../models/genero")


const getGeneros = async (request, response) => {
    try {
        const generos = await Genero.find();
        response.json(generos)
    } catch(e){
        response.status(500).json({
            message: 'Error general'
        })
    }

}

const getGeneroById = async (request, response) => {
    try {
        const { id } = request.params
        const genero = await Genero.findById(id)
        if (!genero) {
            return response.status(404).json({
                message: 'Género no encontrado'
            })
        }
        response.json(genero)
    } catch (e) {
        if (e.name === 'CastError') {
            return response.status(400).json({
                message: e.message
            })
        }
        response.status(500).json({
            message: 'Error general'
        })
    }
}

const crearGenero = async (request, response) => {
    try {
        const { nombre, estado, descripcion } = request.body
        const genero = await Genero.create({
            nombre,
            estado,
            descripcion,
            fechaCreacion: new Date()
        })
        response.status(201).json(genero)
    } catch (e) {
        // TODO: Cambiar por la libreria de Validation con middlewares
        if (e.code === 11000) {
            return response.status(400).json({
                message: 'Ya existe este género'
            })
        }
        if (e.name === 'ValidationError') {
            return response.status(400).json({
                message: e.message
            })
        }
        response.status(500).json({
            message: 'Error general'
        })
    }
}

const actualizarGenero = async (request, response) => {
    try {
        const { id } = request.params
        const { nombre, estado, descripcion } = request.body
        const genero = await Genero.findByIdAndUpdate(
            id,
            {
                nombre,
                estado,
                descripcion,
                fechaActualizacion: new Date()
            },
            { new: true, runValidators: true }
        )
        if (!genero) {
            return response.status(404).json({
                message: 'Género no encontrado'
            })
        }
        response.status(201).json(genero)
    } catch (e) {
        // TODO: Cambiar por la libreria de Validation con middlewares
        if (e.code === 11000) {
            return response.status(400).json({
                message: 'Ya existe este género'
            })
        }
        if (e.name === 'ValidationError' || e.name === 'CastError') {
            return response.status(400).json({
                message: e.message
            })
        }
        response.status(500).json({
            message: 'Error general'
        })
    }
}

const cambiarEstadoGenero = async (request, response) => {
    try {
        const { id } = request.params
        const { estado } = request.body

        if (typeof estado !== 'boolean') {
            return response.status(400).json({
                message: 'El campo estado debe ser true o false'
            })
        }

        const genero = await Genero.findByIdAndUpdate(
            id,
            {
                estado,
                fechaActualizacion: new Date()
            },
            { new: true, runValidators: true }
        )

        if (!genero) {
            return response.status(404).json({
                message: 'Género no encontrado'
            })
        }

        response.json(genero)
    } catch (e) {
        if (e.name === 'CastError') {
            return response.status(400).json({
                message: e.message
            })
        }
        response.status(500).json({
            message: 'Error general'
        })
    }
}

const borrarGenero = async (request, response) => {
    try {
        const { id } = request.params
        const genero = await Genero.findByIdAndDelete(id)
        if (!genero) {
            return response.status(404).json({
                message: 'Género no encontrado'
            })
        }
        response.status(204).json({
            message: 'Género eliminado',
            genero: genero
        })
    } catch (e) {
        if (e.name === 'CastError') {
            return response.status(400).json({
                message: e.message
            })
        }
        response.status(500).json({
            message: 'Error general'
        })
    }
}

module.exports = {
    getGeneros,
    getGeneroById,
    crearGenero,
    actualizarGenero,
    cambiarEstadoGenero,
    borrarGenero
}
