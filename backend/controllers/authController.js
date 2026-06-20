const pool = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// POST - REGISTER USER
async function register(req,res,next) {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const registerdUser = await pool.query(`INSERT INTO users (name,email,username,password) VALUES ($1,$2,$3,$4) RETURNING *`, [name,email,username,hashedPassword])
        const { password, ...userWithoutPassword } = registerdUser.rows[0];
        res.json(userWithoutPassword)
    }catch(err){
        next(err)
    }
}

// POST - LOGIN
async function login(req,res,next) {
    try{
        const result = await pool.query(`SELECT * FROM users WHERE username=$1`, [req.body.username])
        if(!result.rows[0]){
            return res.status(404).json({message: "user not found"})
        }
        const isMatch = await bcrypt.compare(req.body.password, result.rows[0].password)
        if(!isMatch){
            return res.status(401).json({message: "Please enter correct credentials"})
        }
        const token = jwt.sign({id: result.rows[0].id},process.env.JWT_SECRET,{expiresIn: '1h'})
        res.json({jwtToken: token})
    }catch(err){
        next(err)
    }
}

module.exports = { register,login }