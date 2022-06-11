// Simple test to see what type of user is logged in
exports.whoIsLoggedIn = async (req,res) => {
    if(req.user == null){
        return res.status(404).json({message: `No one is logged in.`})
    }
    return res.status(200).json({message: `${req.user.username} is logged in.`})
}