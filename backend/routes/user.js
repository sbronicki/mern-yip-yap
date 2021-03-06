require('dotenv').config()

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        })
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                results: result
            })
        }) 
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
})
router.post('/login', (req, res, next) => {
    let fetchedUser
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: 'Email not in database'
                })
            }
            fetchedUser = user
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if(result.statusCode === 401 || result.statusMessage === 'Unauthorized') return
            if(!result) {
               return res.status(401).json({
                message: 'Email/password is invalid'
               })
            } 
            const token = jwt.sign({
                email: fetchedUser.email, 
                userId: fetchedUser._id,
                username: fetchedUser.username
            }, 
                process.env.ACCESS_TOKEN_SECRET, 
            {
                expiresIn: '1h'
            })
            res.status(200).json({
                expiresIn: 3600,
                username: fetchedUser.username,
                email: fetchedUser.email,
                userId: fetchedUser._id,
                token: token
            })  
        })
        .catch(err => {
            return res.status(401).json({
                error: err
            })
        })
})

module.exports = router