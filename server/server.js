const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require('dotenv').config();

// DB connection
const connection = require('./config/dbConfig');
connection();

const { getBet } = require('./controllers/betController');
const authLogin = require('./routes/api-v1/auth/login');
const refreshToken = require('./routes/api-v1/refreshToken/refresh');
const leaderboard = require('./routes/api-v1/leaderboard/getLeaderboard');
const User = require('./models/userModel');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// Declaring the Port
const PORT = process.env.PORT || 5000;

app.use('/api/v1', authLogin);
app.use('/api/v1', refreshToken);
app.use('/api/v1', leaderboard);

const server = app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));



// Socket.io code
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
});

const gameNamespace = io.of("/game");
const testNamespace = io.of("/test");

io.use((socket, next) => {
    const accessToken = socket.handshake.auth;
    console.log('accessToken', accessToken);
    console.log('auth', socket.handshake.auth);
    console.log('address', socket.handshake.address);
    jwt.verify(accessToken, process.env.SECURE_ACCESS_KEY, (err, decodedToken) => {
        if (err) {
            res.sendStatus(401);
        }
        if (decodedToken) {
            next();
        }
    });
    next();
});

// Get all the agents who connected through socket connection
const getAllClient = async () => {
    const ids = await gameNamespace.in("room1").allSockets();
    const AllClientIds = Array.from(ids);
    console.log('Connected socket ID', AllClientIds);
    // console.log('Connected socket ID Count',AllClientIds.length);
    gameNamespace.in("room1").emit('usercount', { allClient: AllClientIds });
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
        gameNamespace.in("room1").emit('broadcastbet', results);
    }
    const result = { timer }
    gameNamespace.in("room1").emit('broadcasttime', result);
}, 1000);

// io.of('/').on('connection', (socket) => {
//     console.log('new user connected to login -----', socket.id);
// });
testNamespace.on('connection', (socket) => {
    console.log('new user connected to test -----', socket.id);
    socket.on('tests', (data) => {
        console.log("test",data);
    });
});
gameNamespace.on('connection', (socket) => {    
    socket.join("room1");
    console.log('new user connected to game -----', socket.id);
    socket.on('test', (data) => {
        console.log("game",data);
    });
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
        console.log(`Socket disconnected 🔌 : ${socket.id}`);
    });
});