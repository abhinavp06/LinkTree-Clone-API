const express = require("express")
const { signUpUser, signInUser, signOutUser, isLoggedIn, isLoggedInTest } = require("../controllers/userControllers")

const router = express.Router()

router.post('/signup', signUpUser)
router.post('/signin', signInUser)
router.post('/signout', signOutUser)
router.post('/', isLoggedIn, isLoggedInTest)

module.exports = router