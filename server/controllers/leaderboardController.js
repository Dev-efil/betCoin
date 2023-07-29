const User = require('../models/userModel');

const getLeaderboard = async (req, res) => {
    const users = await User.find();
    if (!users) return res.sendStatus(204);
    res.json(users);
    // console.log("req.body",req.body);
    // console.log("from front cookies",cookies);
    // res.sendStatus(200)
}

module.exports = {
    getLeaderboard
}