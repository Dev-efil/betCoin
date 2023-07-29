const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log("auth refresh cookie",cookies);
    if (!cookies?.refreshToken) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.refreshToken;
    // Clear the cookie once we get the data out of it so it's detected and deleted
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse! 👉 Did get a cookie but didn't found the user
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.SECURE_REFRESH_KEY,
            async (err, decoded) => {
                // If we have an error we don't need to worry about it because it means the refresh token is expired invalid token
                if (err) {
                    //Forbidden
                    return res.sendStatus(403);
                }
                // ❗️ Else if the token is valid this user's refresh token is reused - someone attempted to hack!
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                // This will delete all the refresh tokens so it will make the user logout from all the devices
                hackedUser.refreshToken = [];
                await hackedUser.save();
            }
        )
        return res.sendStatus(403);
    }

    // Filtering out the old refresh token and creating a new array without it
    const newRefreshTokenArray = foundUser.refreshToken.filter(refreshTkn => refreshTkn !== refreshToken);

    jwt.verify(refreshToken, process.env.SECURE_REFRESH_KEY, async (err, decoded) => {
        if (err) {
            console.log('expired refresh token')
            foundUser.refreshToken = [...newRefreshTokenArray];
            await foundUser.save();
        }

        if (err || foundUser.name !== decoded.username) {
            return res.sendStatus(403);
        }

        // Refresh token was still valid
        const accessToken = jwt.sign({}, process.env.SECURE_ACCESS_KEY, { expiresIn: '10s' });
        const newRefreshToken = jwt.sign({ username: foundUser.name }, process.env.SECURE_REFRESH_KEY, { expiresIn: '1d' });

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.json({ accessToken });
    });
}

module.exports = {
    handleRefreshToken
}