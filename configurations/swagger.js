const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST Películas Pascualinas',
            version: '1.0.0',
            description: 'Documentación de la API de géneros y películas'
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor local'
            }
        ],
        components: {
            schemas: {
                Genero: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '65f1c2a9b8e4d12a34f56789'
                        },
                        nombre: {
                            type: 'string',
                            example: 'Acción'
                        },
                        estado: {
                            type: 'boolean',
                            example: true
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Películas de acción'
                        },
                        fechaCreacion: {
                            type: 'string',
                            format: 'date-time'
                        },
                        fechaActualizacion: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                GeneroInput: {
                    type: 'object',
                    required: ['nombre'],
                    properties: {
                        nombre: {
                            type: 'string',
                            minLength: 2,
                            example: 'Acción'
                        },
                        estado: {
                            type: 'boolean',
                            example: true
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Películas de acción'
                        }
                    }
                },
                EstadoInput: {
                    type: 'object',
                    required: ['estado'],
                    properties: {
                        estado: {
                            type: 'boolean',
                            example: false
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Error general'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = {
    swaggerSpec
}
