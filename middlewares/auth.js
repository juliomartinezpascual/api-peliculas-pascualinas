const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

/**
 * Valida Bearer JWT y adjunta el usuario en req.usuario
 */
const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Token no proporcionado. Use Authorization: Bearer <token>'
            })
        }

        const token = authHeader.slice(7).trim()
        if (!token) {
            return res.status(401).json({
                message: 'Token no proporcionado. Use Authorization: Bearer <token>'
            })
        }

        const secret = process.env.JWT_SECRET
        if (!secret) {
            return res.status(500).json({
                message: 'JWT_SECRET no configurado en el servidor'
            })
        }

        let payload
        try {
            payload = jwt.verify(token, secret)
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' })
            }
            return res.status(401).json({ message: 'Token inválido' })
        }

        const usuario = await Usuario.findById(payload.id)
        if (!usuario || !usuario.estado) {
            return res.status(401).json({
                message: 'Usuario no autorizado o inactivo'
            })
        }

        req.usuario = usuario
        next()
    } catch (e) {
        return res.status(500).json({ message: 'Error general' })
    }
}

/**
 * Autoriza solo si el rol del usuario está en la lista permitida.
 * Uso: authorize('admin') o authorize('admin', 'operario')
 */
const authorize = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ message: 'No autenticado' })
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                message: `Acceso denegado. Se requiere rol: ${rolesPermitidos.join(' o ')}`
            })
        }

        next()
    }
}

module.exports = {
    verificarToken,
    authorize
}
