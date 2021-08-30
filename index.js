require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const connectDB = require('./config/db.config')
connectDB()

const todoRoute = require('./routers/todo.router')

const path = require('path')

//MiddleWare
app.use(express.json())
app.use(cors())
app.use('/', todoRoute)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
    console.log(`Server up and Running on ${PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).send(`Backend Server is running`)
})