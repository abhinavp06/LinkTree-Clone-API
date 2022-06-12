const express = require("express")
const router = express.Router()

const { updateUser } = require("../controllers/user")
const { isSignedIn } = require("../middlewares/auth")

router.patch("/update", isSignedIn, updateUser)

module.exports = router