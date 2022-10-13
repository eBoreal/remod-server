const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

  
// # --------------- Main Routes --------------- # //

// register a new user 
router.post('/register', async (req, res) => {
    // hash password & create user
    try {
        let hashedPassword = await bcrypt.hash(req.body.passWord, 10)
        const user = new User({
            userId: req.body.userId,
            passWord: hashedPassword
        })

        // save it to database
        const newUser = await user.save()
        res.status(201).json(newUser)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}) 


// log in existing user
router.post('/login', checkUserLogin, (req, res) => {
    if (res.loggedIn) {
        res.status(201).json(res.userId)
    }
})


async function checkUserLogin(req, res, next) {
    try {
        const db_response = await User.findById(req.body.userId)
        const user = db_response[0]
        if (user){
            if (await bcrypt.compare(req.body.passWord, user.passWord)) {
                res.loggedIn = true
                res.userId = user.userId
            }
            else {
                res.status(404).json(
                    { message: `Wrong password for user: ${req.body.userId}` })
            }
        } else {
            res.status(404).json({ message: `No user with id: ${req.body.userId}` })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}


module.exports = router