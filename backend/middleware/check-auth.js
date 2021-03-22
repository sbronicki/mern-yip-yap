const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        console.log(res)
        const token = req.headers.authorization
        jwt.verify(token, 'this_is_the_secret_string_that_is_also_pretty_long')

        next()
    } catch(error) {
        res.status(401).json({message: 'Auth failed'})
    }
}