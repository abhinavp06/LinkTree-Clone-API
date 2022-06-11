const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema(
    {
        linkTitle:{
            type: String,
            required: true
        },
        linkBody:{
            type: String,
            required: true
        },
        linkBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Link", linkSchema)