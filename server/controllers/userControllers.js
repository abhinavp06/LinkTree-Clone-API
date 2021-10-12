const User = require("../model/User")
const passport = require("passport")
exports.signUpUser = async (req,res) => {
    const { username, name, email, password } = req.body;

    const newUser = new User({ username, name, email, password })

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

exports.signInUser = async (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if(err) {
            return res.status(400).json({ errors: err})
        }
        if(!user) {
            return res.status(400).json({errors: "No user found"})
        }
        req.logIn(user , function(err){
            if(err){
                return res.status(400).json({ errors: err})
            }
            return res.status(200).json({ success: `Logged in ${user.username}`})
        })
    })(req,res,next)
}

exports.signOutUser = async (req,res) => {
    req.logout()
    return res.status(200).json({ success: 'Logged out successfully'})
}

exports.isLoggedIn = async(req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.json('Not signed in')
    }
}
exports.isLoggedInTest = async( req, res) => {
    return res.json({message: "Hello"})
}