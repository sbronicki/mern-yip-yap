require('dotenv').config()

const jwt = require('jsonwebtoken')

const accessToken = process.env.ACCESS_TOKEN_SECRET

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, accessToken)
        req.userData = {email: decodedToken.email, userId: decodedToken.userId, username: decodedToken.username}
        next()
    } catch(error) {
        res.status(401).json({message: 'Auth failed'})
    }
}
