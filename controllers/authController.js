const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const generarToken = (usuario) => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET no configurado')
    }

    return jwt.sign(
        {
            id: usuario._id.toString(),
            email: usuario.email,
            rol: usuario.rol
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    )
}

/**
 * Registro público. Por seguridad el rol siempre es operario;
 * solo un admin autenticado puede crear otro admin vía body.rol = 'admin'.
 */
const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body

        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: 'nombre, email y password son requeridos'
            })
        }

        let rolFinal = 'operario'
        if (rol === 'admin') {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(403).json({
                    message: 'Solo un admin autenticado puede crear usuarios admin'
                })
            }

            try {
                const token = authHeader.slice(7).trim()
                const payload = jwt.verify(token, process.env.JWT_SECRET)
                const solicitante = await Usuario.findById(payload.id)
                if (!solicitante || solicitante.rol !== 'admin' || !solicitante.estado) {
                    return res.status(403).json({
                        message: 'Solo un admin autenticado puede crear usuarios admin'
                    })
                }
                rolFinal = 'admin'
            } catch {
                return res.status(403).json({
                    message: 'Solo un admin autenticado puede crear usuarios admin'
                })
            }
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordHash,
            rol: rolFinal,
            fechaCreacion: new Date()
        })

        const token = generarToken(usuario)

        res.status(201).json({
            message: 'Usuario registrado',
            token,
            usuario
        })
    } catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({
                message: 'Ya existe un usuario con ese email'
            })
        }
        if (e.name === 'ValidationError') {
            return res.status(400).json({ message: e.message })
        }
        if (e.message === 'JWT_SECRET no configurado') {
            return res.status(500).json({ message: e.message })
        }
        res.status(500).json({ message: 'Error general' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'email y password son requeridos'
            })
        }

        const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() })
        if (!usuario || !usuario.estado) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            })
        }

        const passwordOk = await bcrypt.compare(password, usuario.password)
        if (!passwordOk) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            })
        }

        const token = generarToken(usuario)

        res.json({
            message: 'Login exitoso',
            token,
            usuario
        })
    } catch (e) {
        if (e.message === 'JWT_SECRET no configurado') {
            return res.status(500).json({ message: e.message })
        }
        res.status(500).json({ message: 'Error general' })
    }
}

const me = async (req, res) => {
    try {
        res.json(req.usuario)
    } catch {
        res.status(500).json({ message: 'Error general' })
    }
}

/**
 * Bootstrap: crea el primer admin si no existe ningún usuario.
 * Útil para arrancar el sistema sin seeds externos.
 */
const bootstrapAdmin = async (req, res) => {
    try {
        const total = await Usuario.countDocuments()
        if (total > 0) {
            return res.status(403).json({
                message: 'Ya existen usuarios. Use /register o pida a un admin que cree cuentas.'
            })
        }

        const { nombre, email, password } = req.body
        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: 'nombre, email y password son requeridos'
            })
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordHash,
            rol: 'admin',
            fechaCreacion: new Date()
        })

        const token = generarToken(usuario)

        res.status(201).json({
            message: 'Admin inicial creado',
            token,
            usuario
        })
    } catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({
                message: 'Ya existe un usuario con ese email'
            })
        }
        if (e.name === 'ValidationError') {
            return res.status(400).json({ message: e.message })
        }
        res.status(500).json({ message: 'Error general' })
    }
}

module.exports = {
    register,
    login,
    me,
    bootstrapAdmin
}
