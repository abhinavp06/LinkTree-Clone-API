const mongoose = require("mongoose")
const hashPassword = require("../helpers/hashPassword")

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        links:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Link'
            }
        ]
    },
    { timestamps: true }
)

customerSchema.pre('save', async function (next){
    try{
        const hashedPassword = await hashPassword(this.password) // hashing the plain password
        this.password = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("User", userSchema)