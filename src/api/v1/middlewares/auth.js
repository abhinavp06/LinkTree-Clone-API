// To check if a session is active
// Most of the functions need a user to be signed in or else they are not allowed to access those functionalities
exports.isSignedIn = async(req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.json({message: `Please sign in first.`})
    }
}