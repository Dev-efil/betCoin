const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc    login
// @route   POST /api/v1/login
// @access  public
const authLogin = async (req, res) => {
    const cookies = req.cookies;
    const { userID, name, email, picture } = req.body;
    console.log(req.body);
    console.log("auth login cookies",cookies);
    try {
        if (!email) {
            return res.sendStatus(400);
        }
        const foundUser = await User.findOne({ email });
        let refreshToken = jwt.sign({ username: name }, process.env.SECURE_REFRESH_KEY, { expiresIn: '1d' })
        if (!foundUser) {
            try {
                const newUser = new User({
                    userID,
                    name,
                    email,
                    points: 500,
                    picture,
                    refreshToken
                });
                let accessToken = jwt.sign({ username: name }, process.env.SECURE_ACCESS_KEY, { expiresIn: 600 }); // Expires in 10 Min
                const newUserSaved = await newUser.save();
                console.log("newUserSaved",newUserSaved);

                res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                res.status(200).json({ accessToken, user: { userID: userID, name: name, email: email, url: picture } });
            } catch (error) {
                return res.status(400).send({ Error: error });
            }
        } else {
            let newRefreshTokenArray =
                !cookies?.refreshToken
                    ? foundUser.refreshToken
                    : foundUser.refreshToken.filter(refreshTkn => refreshTkn !== cookies.refreshToken);

            if (cookies?.refreshToken) {
                /* 
                    Scenario added here: 
                        1) User logs in but never uses refresh token and does not logout 
                        2) refresh token is stolen
                        3) If 1 & 2, reuse detection is needed to clear all refresh tokens when user logs in
                */
                const refreshToken = cookies.refreshToken;
                const foundToken = await User.findOne({ refreshToken }).exec();

                // Detected refresh token reuse!
                if (!foundToken) {
                    // clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }
                res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
            }

            let accessToken = jwt.sign({ username: name }, process.env.SECURE_ACCESS_KEY, { expiresIn: 600 });
            foundUser.refreshToken = [...newRefreshTokenArray, refreshToken];
            const user = await foundUser.save();
            console.log(user);

            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({ accessToken, user: { userID: userID, name: name, email: email, url: picture } });
        }
    } catch (error) {
        return res.status(400).send({ Error: error });
    }
}

module.exports = {
    authLogin
}