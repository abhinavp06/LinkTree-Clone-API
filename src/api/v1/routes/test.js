const express = require("express")
const router = express.Router()

const { whoIsLoggedIn } = require("../test/whoIsLoggedIn")

router.get("/whoisloggedin", whoIsLoggedIn)

module.exports = router