// imports
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// import routes
import companyRouter from './routes/company'
import employeeRouter from './routes/employee'

const app = express()
const port = 8000

// add middlewares
app.use(cors())
app.use(bodyParser.json())

// add a latency of 300 ms
app.use((_, __, next) => setTimeout(next, 300))

// listen for routes
app.use('/company', companyRouter)
app.use('/employee', employeeRouter)

// start server
app.listen(port, () => console.log('Server started on port 8000'))
