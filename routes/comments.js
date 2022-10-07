const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

// # --------------- Main Routes --------------- # //

// creating a comment 
router.post('/', async (req, res) => {
    const comment = new Comment({
        id: req.body.id,
        url: req.body.url,
        target: req.body.target,
        boxId: req.body.boxId,
        commentText: req.body.commentText,
        author: req.body.author, 
        timeStamp: req.body.timeStamp,
        upvotes: req.body.upvotes
    })
    try {
        const newComment = await comment.save()
        res.status(201).json(newComment)
    } catch (err) {
        // something wrong with user input
        res.status(400).json({ message: err.message })
    }
}) 


// Get all records
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting comments matching a specific url
router.get('/boxes/:url', getUrlComments, (req, res) => {
    res.json(res.comments)
})

// middle.w to get single comment
async function getUrlComments(req, res, next) {
    let comments;
    try {
        comments = await Comment.findByUrl(req.params.url)
        if (comments.length == 0) {
            return res.status(404).json({ message: 'No comment at this url' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }   

    res.comments =  comments
    next()
}


// # --------------- Comment Specific --------------- # //

// Get a specific comment
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment)
})

// Updating a comment's upvotes
router.patch('/:id', getComment, async (req, res) => {
    if (req.body.upvotes != null) {
        res.comment.upvotes = req.body.upvotes
    }
    try {
        const updatedComment = await res.comment.save()
        res.json(updatedComment)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting a comment
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove()
        res.json({ message: 'Deleted Comment' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middle.w to get single comment
async function getComment(req, res, next) {
    let comment;
    try {
        comment = await Comment.findById(req.params.id)
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }   

    res.comment =  comment
    next()
}

module.exports = router