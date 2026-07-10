

function errorHandler(err,req,res,next){
    console.log(err)
    if(err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: err.message })
    }
    res.status(err.status || 500).json({message: err.message})
}

module.exports = errorHandler