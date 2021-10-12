require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const allRoutes = require("./routes/allRoutes")
const session = require('express-session')
const passport = require('./passport/setup')
// const MongoStore = require("connect-mongo")(new session)
mongoose.connect(process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(console.log(`MONGODB CONNECTED`));

const app = express()

app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //     mongoUrl: process.env.MONGODB_URL
    // })
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req,res) => {
    res.json("🎂")
})

app.use("/", allRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})