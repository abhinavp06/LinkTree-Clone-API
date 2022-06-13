// To check if a session is active
// Most of the functions need a user to be signed in or else they are not allowed to access those functionalities
exports.isSignedIn = async(req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.json({message: `Please sign in first!`})
    }
}

// Check whether the logged in user is the link creator
const Link = require("../models/Link")

exports.isLinkCreator = async (req,res,next) => {
    const { linkID } = req.params
    const link = await Link.findOne({_id: linkID})
    if(link.linkBy.equals(req.user._id))
        next()
    else{
        res.json({message: `You cannot edit other's links!`})
    }
}