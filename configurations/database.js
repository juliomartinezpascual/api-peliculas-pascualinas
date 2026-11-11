const mongoose = require('mongoose')

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'pelis-pascualinas'
        })
        console.log('Conectado a Mongo!!!')
    } catch(e) {
        console.error(e)
        throw new Error('Error al conectar con mongo')
    }
}

module.exports = {
    mongoConnect
}