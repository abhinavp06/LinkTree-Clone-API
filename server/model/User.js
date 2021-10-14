const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            min: 4,
            max: 30
        },
        name:{
            type: String,
            required: true,
            min: 1,
            unique: false
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        bio:{
            type: String,
            max: 150,
            default: "Welcome to my linktree!"
        },
        password:{
            type: String,
            required: true
        },
        userLinks:[{ 
            linkName:{
                type: String,
                required: true
            },
            linkBody:{
                type: String,
                required: true
            }
        }]
    },
    { timestamps: true }
)


userSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})
module.exports = mongoose.model("User", userSchema)