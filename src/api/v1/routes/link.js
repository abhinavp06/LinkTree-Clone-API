const express = require("express")
const router = express.Router()

const { createLink, updateLink, deleteLink } = require("../controllers/link")
const { isSignedIn, isLinkCreator } = require("../middlewares/auth")

router.post("/create", isSignedIn, createLink)
router.patch("/update/:linkID", isSignedIn, isLinkCreator, updateLink)
router.delete("/delete/:linkID", isSignedIn, isLinkCreator, deleteLink)

module.exports = router