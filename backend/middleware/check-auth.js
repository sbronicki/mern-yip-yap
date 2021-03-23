require('dotenv').config()

const jwt = require('jsonwebtoken')

const accessToken = process.env.ACCESS_TOKEN_SECRET

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        jwt.verify(token, accessToken)
        next()
    } catch(error) {
        res.status(401).json({message: 'Auth failed'})
    }
}
