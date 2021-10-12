const User = require("../model/User")

exports.signUpUser = async (req,res) => {
    const { username, name, email, password } = req.body;

    const newUser = new User({ username, name, email, password })

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

exports.signinUser = async (req, res) => {

}