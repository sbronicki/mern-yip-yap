const express = require('express')

const router = express.Router()

const Post = require('../models/post');

//save post
router.post('/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
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
router.delete('/posts/:id', (req, res, next) => {
    Post.deleteOne({_id:  req.params.id})
    .then(result => console.log('deleted'))
    res.status(200).json({message: 'Post deleted'})
})
// put edited post
router.put('/posts/:id', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
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
router.use('/posts/:id' ,(req, res, next) => {
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
router.use('/posts' ,(req, res, next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({
            message: 'Posts fetch success',
            posts: posts
        })
    })
    .catch(e => console.log(e))
})

module.exports = router