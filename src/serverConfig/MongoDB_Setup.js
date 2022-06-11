require("dotenv").config()
const mongoose = require("mongoose")

exports.setUpMongo = function(){
    try {
        mongoose.connect(process.env.MONGODB_URL, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        ).then(
            console.log(`MONGODB CONNECTED`))
    } catch (error) {
        console.log(error)
    }
}