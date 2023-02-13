const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc    login
// @route   POST /api/v1/login
// @access  public
const authLogin = async (req, res) => {
    const { userID, name, email, picture } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ Error: "Bad Request" });
        }
        else {
            const findUser = await User.findOne({ email: req.body.email });
            if (!findUser) {
                const newUser = new User({
                    userID: req.body.userID,
                    name: req.body.name,
                    email: req.body.email,
                    points: 500
                });
                try {
                    let token = jwt.sign({ username: req.body.name }, process.env.SECURE_KEY, { expiresIn: 600 }); // Expires in 10 Min
                    const userRegister = await newUser.save();
                    return res.status(200).json({ token, user: { userID: userID, name: name, email: email, url: picture } });
                } catch (error) {
                    return res.status(400).send({ Error: error });
                }
            } else {
                let token = jwt.sign({ username: req.body.name }, process.env.SECURE_KEY, { expiresIn: 600 });
                return res.status(200).json({ token, user: { userID: userID, name: name, email: email, url: picture } });
            }
        }
    } catch (error) {
        return res.status(400).send({ Error: error });
    }
}

module.exports = {
    authLogin
}