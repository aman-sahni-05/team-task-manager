const jwt = require('jsonwebtoken')

async function verifyToken(req,res,next) {
    const authHead = req.headers.authorization
    if(!authHead){
        return res.status(401).json({message: "Token not found in headers"})
    }
    const token = authHead.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Invalid Token Format"})
    }
    try{
        const verify = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verify
        next()
    }catch(err){
        next(err)
    }
}

module.exports = verifyToken