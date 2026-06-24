require('dotenv').config()
const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoute.js')
const taskRoutes = require('./routes/taskRoutes.js')
const projectRoutes = require('./routes/projectsRoute.js')
const errorHandler = require('./middleware/errorMiddleware.js')
app.use(express.json())

app.use('/auth', authRoutes) //Login and Register

app.use('/tasks', taskRoutes) // Tasks CRUD

app.use('/projects', projectRoutes) // Project CRUD

//error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})