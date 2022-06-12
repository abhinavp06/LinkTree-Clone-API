/*
    POST:
        sign up
        sign in
        sign out
*/

const User = require("../models/User");
const passport = require("passport");
const { sendRegistrationEmail } = require("../services/EmailSender");

// SIGN UP
exports.signUp = async (req,res) => {

    const { username, name, email, password } = req.body;

    const newUser = new User({ username, name, email, password })

    try {
        await newUser.save()
        await sendRegistrationEmail(email, username)
        res.status(200).json({message: `Sign up successful! A registration email has been sent to you.`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// SIGN IN
exports.signIn = async (req,res,next) => {
    passport.authenticate("local", function(err, user, info) {
        if(err) {
            return res.status(500).json({ message: err})
        }
        if(!user) {
            return res.status(404).json({message: `Invalid credentials.`})
        }
        req.logIn(user , function(err){
            if(err){
                return res.status(500).json({ message: error })
            }
            return res.status(200).json({ message: `Logged in ${user.username}`})
        })
    })(req,res,next)
}

// SIGN OUT
exports.signOut = async(req,res) => {
    req.logout()
    return res.status(200).json({ message: `Logged out successfully`})
}