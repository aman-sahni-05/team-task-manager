require('dotenv').config()
const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoute.js')
app.use(express.json())

app.use('/auth', authRoutes)


app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})