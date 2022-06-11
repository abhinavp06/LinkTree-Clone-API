const express = require("express")
const { signUpUser, signInUser, signOutUser, isLoggedIn, isLoggedInTest, urlTest, showUserProfile, isAuthenticated, createLink, isAuthenticatedTest, ifProfileExists, signUpChecker, editLink, deleteLink, editBio } = require("../controllers/userControllers")

const router = express.Router()

// POST ROUTES
    // Authentication
router.post('/signup', signUpChecker, signUpUser)
router.post('/signin', signInUser)
router.post('/signout', signOutUser)
    // Links
router.post('/:id/create', isLoggedIn, isAuthenticated, createLink)

    // MIDDLEWARE TESTS
router.post('/', isLoggedIn, isLoggedInTest)
router.post('/:id', isAuthenticated, isAuthenticatedTest)
router.post('/:id', urlTest)

// GET ROUTES
router.get('/:id', ifProfileExists, showUserProfile)

// PUT ROUTES
router.put('/:id/edit/bio', isLoggedIn, isAuthenticated, editBio)
router.put('/:id/edit/:linkId', isLoggedIn, isAuthenticated, editLink)


// DELETE ROUTES
router.delete('/:id/delete/:linkId', isLoggedIn, isAuthenticated, deleteLink)

module.exports = router