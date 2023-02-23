const User = require('../models/userModel');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        // No content
        return res.sendStatus(204);
    }
    const refreshToken = cookies.refreshToken;

    // Check refresh token is in the DB
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refresh token in DB
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    await foundUser.save();

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = {
    handleLogout
}