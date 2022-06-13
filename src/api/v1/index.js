require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/Passport_Setup")
const { setUpMongo } = require("../../serverConfig/MongoDB_Setup")

// IMPORTING ROUTES
const authRoutes = require("./routes/auth")
const testRoutes = require("./routes/test")
const userRoutes = require("./routes/user")
const linkRoutes = require("./routes/link")
const { getUserByUsername } = require("./controllers/user")

const app = express()

// SETTING UP
setUpMongo()

// USE LIBRARIES
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
try{
    app.use(passport.initialize())
    app.use(passport.session())
    console.log(`PASSPORT SETUP COMPLETE`)
}catch(error){
    console.log(error)
}

//ROUTES
app.get("/", (req,res) => {
    res.status(200).send("🤖")
})
app.get("/:username", getUserByUsername)
app.use("/v1/auth", authRoutes)
app.use("/v1/test", testRoutes)
app.use("/v1/user", userRoutes)
app.use("/v1/link", linkRoutes)
app.get("*", function(req, res) {
    res.status(404).json({message: `Invalid URL!`});
})

//PORT
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App is up and running!\nPort: ${port}`)
})