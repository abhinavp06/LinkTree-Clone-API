const express = require("express")
const router = express.Router()

const { signUp, signIn, signOut } = require("../controllers/auth")
const { isSignedIn } = require("../middlewares/auth")


router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/signout", isSignedIn ,signOut)

module.exports = router