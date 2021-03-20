const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNicm9uaWNraUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MDU0MTYyNzFkYzI2MTY0Yjg4MWIzZTQiLCJpYXQiOjE2MTYxOTk5ODUsImV4cCI6MTYxNjIwMzU4NX0.TZTGFPO_uGNFbU6lXPe3c14EK75O8c95g2AyISK9fkY'

        console.log(req.headers)
        console.log(req.headers.authorization)

        jwt.verify(token, 'this_is_the_secret_string_that_is_also_pretty_long')

        next()
    } catch(error) {
        res.status(401).json({message: 'Auth failed'})
    }
}