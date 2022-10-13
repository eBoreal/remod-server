const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
// var LocalStrategy = require('passport-local')


// const authenticateUser = async (userId, passWord, done) => {
//     console.log(userId, passWord)
//     console.log("passport looking for user")
//     return done(null, userId)
    // try {
    //     const user = await User.findById(userId)
    //     try {
    //         if (await bcrypt.compare(passWord, user.passWord)) {
    //             return done(null, user)
    //         } else {
    //             return done(null, false, { message: 'Password incorrect' })
    //         }
    //     } catch (err) {
    //         return done(err)
    //     }
    // } catch (err) {
    //     return done(null, false, { message: `No user with id: ${userId}`})
    // }

// }
// passport.use(new LocalStrategy(authenticateUser));
// passport.serializeUser((user, done) => done(null, user.userId))
// passport.deserializeUser((userId, done) => {
//     done(null, User.findById(userId))})
  
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
router.post('/login', async (req, res) => {
    try {
        const db_response = await User.findById(req.body.userId)
        const user = db_response[0]
        if (user){
            console.log(req.body.passWord)
            console.log(user)
            if (await bcrypt.compare(req.body.passWord, user.passWord)) {
                res.status(201).json(user)
            }
            else {
                res.status(404).json({ message: `Wrong password for user: ${req.body.userId}` })
            }
        } else {
            res.status(404).json({ message: `No user with id: ${req.body.userId}` })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    
})



module.exports = router