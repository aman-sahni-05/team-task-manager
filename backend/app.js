require('dotenv').config()
const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoute.js')
const taskRoutes = require('./routes/taskRoutes.js')
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)


app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})