import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import sequelize from './DB/createDB.js'
import api from './routes/api.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', api)


app.listen(process.env.PORT, async () => {

    await sequelize.authenticate()
    await sequelize.sync()

    console.log(`start running server on port "http://localhost:${process.env.PORT}"`);
    
})