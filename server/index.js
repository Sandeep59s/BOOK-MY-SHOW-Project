const express = require('express')

const app = express()
const userRoutes = require('./routes/userRoutes')
app.use(express.json())

require('dotenv').config();

const dbConfig = require('./config/dbConfig')


const PORT = 8080




app.use('/api/users' , userRoutes)







app.listen(PORT , ()=>{
    console.log("server running")
})