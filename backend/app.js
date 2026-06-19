require('dotenv').config()
const express = require('express')
const app = express()
const pool = require('./config/db.js')


async function run(){
    const result = await pool.query('SELECT NOW();')
    console.log(result.rows[0])
}
run()

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})