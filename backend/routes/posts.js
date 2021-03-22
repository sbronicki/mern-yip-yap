const express = require('express')

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

//save post
router.post('', checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    })
    post.save()
    .then(savedPost => {
        res.status(201).json({
            message: 'Post added',
            postId: savedPost._id
        })
    })
})
//delete saved posts
router.delete('/:id', checkAuth, (req, res, next) => {
    Post.deleteOne({_id:  req.params.id})
    .then(result => console.log('deleted'))
    res.status(200).json({message: 'Post deleted'})
})
// put edited post
router.put('/:id', checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        _id: req.body.id
    })
    Post.updateOne({_id: post._id}, post)
    .then(result => {
        console.log('updated post')
        res.status(200).json({message: 'Post update successful'})
    })
    .catch(error => {
        console.log(error, 'in appp.put')
    })
})
//get post to edit
router.use('/:id', checkAuth, (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(posts => {
        res.status(200).json({
            message: 'Posts fetch success',
            posts: posts
        })
    })
    .catch(e => console.log(e))
})
//get saved posts
router.use('', checkAuth, (req, res, next) => {
    Post.find().limit(5)
    .then(posts => {
        res.status(200).json({
            message: 'Posts fetch success',
            posts: posts
        })
    })
    .catch(e => console.log('routes: ', e))
})

module.exports = router