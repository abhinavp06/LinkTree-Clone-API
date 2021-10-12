const bcrypt = require("bcrypt")
const User = require("../model/User")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

passport.serializeUser ((user, done) => {
    done(null, user.id)
})

passport.deserializeUser ((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(
    new LocalStrategy({ usernameField: "username"}, (username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if(!user){
                return res.json({message: 'No user with that username'})
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err){
                        throw err
                    }
                    if(isMatch) {
                        return done(null, user)
                    }
                    else{
                        return done(null, false, {message: 'Password incorrect'})
                    }
                })
            }
        }).catch(err => {
            return done(null, false, { message: err})
        })
    })
)

module.exports = passport