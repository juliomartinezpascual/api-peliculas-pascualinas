const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST Películas Pascualinas',
            version: '1.1.0',
            description: 'API de géneros y películas con autenticación JWT (roles: admin, operario)'
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Pegue el token JWT obtenido en /api/v1/auth/login'
                }
            },
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '65f1c2a9b8e4d12a34f56789'
                        },
                        nombre: {
                            type: 'string',
                            example: 'Ana Admin'
                        },
                        email: {
                            type: 'string',
                            example: 'admin@pascualinas.com'
                        },
                        rol: {
                            type: 'string',
                            enum: ['admin', 'operario'],
                            example: 'admin'
                        },
                        estado: {
                            type: 'boolean',
                            example: true
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
                AuthLoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'admin@pascualinas.com'
                        },
                        password: {
                            type: 'string',
                            example: 'Admin123'
                        }
                    }
                },
                AuthRegisterInput: {
                    type: 'object',
                    required: ['nombre', 'email', 'password'],
                    properties: {
                        nombre: {
                            type: 'string',
                            example: 'Pedro Operario'
                        },
                        email: {
                            type: 'string',
                            example: 'operario@pascualinas.com'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            example: 'Operario123'
                        },
                        rol: {
                            type: 'string',
                            enum: ['admin', 'operario'],
                            example: 'operario',
                            description: 'Solo admin autenticado puede enviar rol=admin'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Login exitoso'
                        },
                        token: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                        },
                        usuario: {
                            $ref: '#/components/schemas/Usuario'
                        }
                    }
                },
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
