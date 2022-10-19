// imports
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// import routes
import companyRouter from './routes/company'

const app = express()
const port = 8000

// add middlewares
app.use(cors())
app.use(bodyParser.json())

// listen for routes
app.use('/company', companyRouter)

// start server
app.listen(port, () => console.log('Server started on port 8000'))
