const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const { routes } = require('./src/routes') 

dotenv.config({path: './.env'})

//connect DB
mongoose.connect('mongodb+srv://Bogdan:3bKK4zk4IObHR65u@cluster0.v19pl.mongodb.net/mevnshop', 
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('DB connect true')) 
//
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


routes.forEach(item => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})
//routes
const PORT = 3000
http.createServer({}, app).listen(PORT)
console.log(`server running at ${PORT}`);