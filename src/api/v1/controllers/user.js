/*
    GET:
        user by username
    PATCH:
        update user details
*/

const User = require("../models/User")
const Link = require("../models/Link")

exports.getUserByUsername = async (req,res) => {
    const { username } = req.params
    try {
        const user = await User.findOne({username: username})
        if(!user)
            return res.status(404).json({message: `No user found!`})
        const links = await Link.find({linkBy: user._id})

        return res.status(200).json({
            _id: user._id,
            username: username,
            name: user.name,
            email: user.email,
            links: links
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

exports.updateUser = async (req,res) => {
    try {
        User.findByIdAndUpdate(req.user._id, req.body, {new: true}).then((user) => {
            if(!user)
                return res.status(404).json({message: `No user found!`})
            return res.status(200).json({message: `Updated user details!`})
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }
}