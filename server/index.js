require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const allRoutes = require("./routes/allRoutes")
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

app.get("/", (req,res) => {
    res.json("🎂")
})

app.use("/", allRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})