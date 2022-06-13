/*
    POST:
        create link
    PATCH:
        update link
    DELETE:
        delete link
*/

const Link = require("../models/Link")

exports.createLink = async (req,res) => {
    const { linkTitle, linkBody } = req.body
    try{
        const newLink = new Link({linkTitle, linkBody})
        newLink.linkBy = req.user._id
        await newLink.save()
        await req.user.links.push(newLink._id)
        await req.user.save()
        return res.status(200).json({message: `Created new link!`})
    }catch(error){
        return res.status(500).json({message: error})
    }
}

exports.updateLink = async (req,res) => {
    const { linkID } = req.params
    try {
        Link.findByIdAndUpdate(linkID, req.body, {new: true}).then((link) => {
            if(!link)
                return res.status(404).json({message: `No link found!`})
            return res.status(200).json({message: `Updated link details!`})
        })
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

exports.deleteLink = async (req,res) => {
    const { linkID } = req.params
    try {
        const link = await Link.findOne({_id: linkID})
        if(!link)
            return res.status(404).json({message: `No link found!`})
        await req.user.links.pull(linkID)
        await req.user.save()
        await Link.deleteOne({_id: linkID})
        return res.status(200).json({message: `Link deleted!`})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}