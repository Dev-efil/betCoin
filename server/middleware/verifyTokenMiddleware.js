const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: "Token required for authentication." })
        }
        else {
            let splitToken = token.split(' ')[1];
            jwt.verify(splitToken, process.env.SECURE_ACCESS_KEY, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: "Token is not valid." });
                }
                if (decodedToken) {
                    next();
                }
            });
        }
    } catch (error) {
        res.status(401).json({ Error: error });
    }

};


module.exports = verifyToken;