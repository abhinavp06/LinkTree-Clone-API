
// Simple bcrypt hash
const bcrypt = require("bcrypt")

exports.hashPassword = async function(plainPass) {
    const hashedPassword = await bcrypt.hash(plainPass.toString(), 10)
    return hashedPassword
}