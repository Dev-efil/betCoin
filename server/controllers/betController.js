const User = require("../models/userModel");

const getBet = async (clientValue, winningNumber) => {
    console.log("placedBetNumber", clientValue.betNumber);
    console.log("winningBetNumber", winningNumber.push);

    try {
        if (!clientValue.email) {
            const msg = { Error: "Bad Request" };
            return msg;
        }
        else {
            const findUser = await User.findOne({ email: clientValue.email });
            if (!findUser) {
                const msg = { Error: "Bad Request" };
                return msg;
            } else {
                const email = clientValue.email;
                const placedBetNumber = Number(clientValue.betNumber);
                const winningBetNumber = winningNumber.push;
                if (winningBetNumber === placedBetNumber) {
                    console.log(winningBetNumber, placedBetNumber, email);
                    User.findOneAndUpdate({ email: email }, { $inc: { points: 100 } });
                }
                else {
                    // Send try again message
                    User.findOneAndUpdate({ email: email }, { $inc: { points: -100 } }, (err, response) => {
                        if (err) {
                            console.log("err",err);
                        } else {
                            console.log("response.credit",response.credit);
                        }
                    });

                }
            }
        }
    } catch (error) {
        const msg = { Error: "Bad Request" };
        return msg;
    }
}

module.exports = {
    getBet
}