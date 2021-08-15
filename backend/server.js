require('dotenv').config()
const express = require("express")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./db')
const PORT = process.env.PORT || 4221

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))


const start = async () => {

    try {
    
        await sequelize.authenticate()
        await sequelize.sync()
        
        app.listen(PORT, ()=>{
            console.log(`Server is listening ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
    
}

start()