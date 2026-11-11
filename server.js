const { json } = require('body-parser')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()


const generoRoutes = require('./routes/generoRoutes')
const { mongoConnect } = require('./configurations/database')
const { swaggerSpec } = require('./configurations/swagger')

mongoConnect()

const app = express()


// asignar puerto
app.set('port', 5000)

// middlewares
app.use(json())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/generos', generoRoutes);

// arrancar el servidor en el puerto
app.listen(app.get('port'), () => {
    console.log ("Servidor arriba en el puerto: " + app.get('port'))
    console.log('Swagger UI: http://localhost:' + app.get('port') + '/api/docs')
})
