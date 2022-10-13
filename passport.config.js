// const LocalStrategy = require('passport-local').Strategy
// // const User = require('../models/user')
// const bcrypt = require('bcrypt')

// function initialize(passport, User) {
//     const authenticateUser = async (userId, passWord, done) => {
//         console.log("passport looking for user")
//         try {
//             const db_response = await User.findById(userId)
//             const user = db_response[0]            
//             try {
//                 if (await bcrypt.compare(passWord, user.passWord)) {
//                     return done(null, user)
//                 } else {
//                     return done(null, false, { message: 'Password incorrect' })
//                 }
//             } catch (err) {
//                 return done(err)
//             }
//         } catch (err) {
//             return done(null, false, { message: `No user with id: ${userId}`})
//         }

//     }
//     passport.use(new LocalStrategy({ usernameField: 'userId'}, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user.userId))
//     passport.deserializeUser((userId, done) => {
//         done(null, User.findById(userId))})

// }

// module.exports = initialize
