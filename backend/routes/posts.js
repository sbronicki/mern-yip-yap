const express = require('express')
// const multer = require('multer')

const Post = require('../models/post');

const router = express.Router()

// const MIME_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpg',
//     'image/jpg': 'jpg'
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE_MAP[file.mimetype]
//         let error = new Error('Invalid mime type')
//         if(isValid){
//             error = null
//         }
//         cb(null, 'backend/images')
//     }, 
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLowerCase().split(' ').join('-')
//         const ext = MIME_TYPE_MAP[file.mimetype]
//         cb(null, name + '-' + Date.now() + '.' + ext)
//     }
// })

//save post
router.post('/posts',(req, res, next) => {
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