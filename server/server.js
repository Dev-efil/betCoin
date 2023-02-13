const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Declaring the Port
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));


// Socket.io code
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
});

// Get all the agents who connected through socket connection
const getAllClient = async () => {
    const ids = await io.allSockets();
    const AllClientIds = Array.from(ids);
    console.log('Connected socket ID', AllClientIds);
    // console.log('Connected socket ID Count',AllClientIds.length);
    io.emit('usercount', { allClient: AllClientIds });
}

const results = [];
const generateRandomValue = () => {
    const arr = ['1', '2', '3', '4', '5', '6', '12'];
    let random = Math.floor(Math.random() * arr.length);
    const betPoint = arr[random];
    results.push = Number(betPoint);
    return results;
}

let timer = 10;
setInterval(() => {
    if (timer > 0) {
        timer--;
    } else {
        timer = 10;
    }
    if (timer === 0) {
        const betPoint = generateRandomValue();
        const results = { betPoint: betPoint.push };
        io.emit('broadcastbet', results);
    }
    const result = { timer }
    io.emit('broadcasttime', result);
}, 1000);

io.on('connection', (socket) => {
    getAllClient();
    // Register an event to console the data which coming from Client.
    socket.on('bet', (getBetdata) => {
        // console.log("getBetdata", getBetdata);
        getBet(getBetdata, results);
    });

    // User.find({ email: 'thanushkanth95@gmail.com' }, {points: 1, _id: 0}, (err,res) => {
    //     if (err) {
    //         console.log("err",err);
    //     } else {
    //         socket.emit('userCoinAmount', res);
    //     }
    // });


    socket.on('disconnect', function () {
        getAllClient()
        // console.log(`Socket disconnected 🔌 : ${socket.id}`);
    });
});