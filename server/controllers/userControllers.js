const User = require("../model/User")
const passport = require("passport")
const mongoose = require("mongoose")

// AUTHENTICATION
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
        res.json('Please sign in first.')
    }
}

exports.isLoggedInTest = async( req, res) => {
    return res.json({message: `${req.user.username} is currently logged in!`})
}

// If someone is logged in, they cannot sign up as a new user. They need to logout.
exports.signUpChecker = async (req,res, next) => {
    if(req.user){
        res.json(`Please sign out first.`)
    }else{
        next()
    }
}

exports.isAuthenticated = async (req, res, next) => {
    const {id} =req.params; 
    if(req.user.username == id){
        next();
    }else{
        res.json(`You are not allowed to edit other's profiles`)
    }
}

exports.isAuthenticatedTest = async (req,res) => {
    return res.json({message: "Successfully authenticated"})
}

//  PROFILES AND LINKS

exports.showUserProfile = async (req,res) => {
    const {id} = req.params 
    User.find({username: id}, {'_id': 0, 'password': 0, '__v': 0, 'createdAt': 0, 'updatedAt': 0}, function(err, docs) { 
        if(err){
            res.json(err)
        }else{
            res.json(docs)
        }
    })
}

exports.ifProfileExists = async (req,res,next) => {
    const {id} = req.params
    User.exists({ username: id }, function(err, result) {
        if (err) {
          res.send(err)
        } else {
            if(result){
                next()
            }
            else{
                res.status(404).json(`Invalid link`)
            }
        }
      });
}

exports.createLink = async (req,res) => {
    const {id} = req.params
    
    User.findByIdAndUpdate(
        req.user._id,
        { $push: {"userLinks": req.body}},
        {  safe: true, upsert: true},
          function(err, model) {
            if(err){
               console.log(err);
               return res.send(err);
            }
             return res.json(`Link created. You can visit your profile at ${`http://localhost:8000/${id}`}`);
    });

}

exports.editLink = async (req,res) => {
    const {id, linkId} = req.params
    User.findOneAndUpdate(
        { "_id": req.user._id, "userLinks._id": linkId },
        { 
            "$set": {
                "userLinks.$": req.body
            }
        },
        function(err,doc) {
            if(err){
                res.json(err)
            }else[
                res.json(`Link updated`)
            ]
        }
    );
}

exports.deleteLink = async (req,res) => {
    const {id, linkId} = req.params
    User.findByIdAndUpdate(
        req.user._id,
       { $pull: { 'userLinks': {  _id: linkId } } },function(err,model){
          if(err){
               console.log(err);
               return res.send(err);
            }
            return res.json(`Link deleted`);
        });
}

// BIO

exports.editBio = async (req, res) => {

    var input = JSON.stringify(req.body);

    var fields = input.split('"');

    var newBio = fields[3];

    if(newBio.length > 150){
        return res.json(`Bio cannot be more than 150 characters`)
    }else{
        try {
            await User.findByIdAndUpdate(req.user._id, { bio: newBio });
            res.json(`Bio updated`)
        }catch (err) {
            res.json(err)
        }
    }

}

// Testing to see how to take username from url and show details of user
exports.urlTest = async (req,res) => {
    const {id} = req.params
    
    User.find({username: id}, {'_id': 0, 'username': 1, 'name': 1, 'bio': 1, 'userLinks': 1}, function(err, docs) { 
        if(err){
            res.json(err)
        }else{
            res.json(docs)
        }
    })
}