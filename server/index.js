const express = require('express')
var cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoute')
app.use(express.json())

require('dotenv').config();

const dbConfig = require('./config/dbConfig')


const PORT = 8080



app.use(cors())
app.use('/api/users' , userRoutes)

app.use('/api/movies',movieRoutes)







app.listen(PORT , ()=>{
    console.log("server running")
})