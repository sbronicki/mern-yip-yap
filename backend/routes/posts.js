const express = require('express')

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

//save post
router.post('', checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        creator: req.userData.userId,
        username: req.userData.username
    })
    if(post.title.length === 0 || post.content.length === 0) return
    post.save()
    .then(savedPost => {
        res.status(201).json({
            message: 'Post added',
            postId: savedPost._id
        })
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})
//delete saved posts
router.delete('/:id', checkAuth, (req, res, next) => {
    Post.deleteOne({_id:  req.params.id, creator: req.userData.userId})
    .then(result => {
        if(result.n > 0) {
            res.status(200).json({message: 'Post deleted'})
        } else {
            res.status(401).json({message: 'Not authorized!'})
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})
// put edited post
router.put('/:id', checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        _id: req.body.id
    })
    Post.updateOne({_id: post._id, creator: req.userData.userId}, post)
    .then(result => {
        if(result.nModified > 0) {
            res.status(200).json({message: 'Post update successful'})
        } else {
            res.status(401).json({message: 'Not authorized!'})
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})
//get post to edit
router.use('/:id', (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(posts => {
        res.status(200).json({
            message: 'Posts fetch success',
            posts: posts
        })
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})
//get saved posts
router.use('', (req, res, next) => {
    // Post.find().limit(5) when pagination is added
    Post.find()
    .then(posts => {
        res.status(200).json({
            message: 'Posts fetch success',
            posts: posts
        })
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})

module.exports = router