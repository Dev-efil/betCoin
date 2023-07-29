import io from 'socket.io-client';

export const gameSocket = io.connect('http://localhost:5000/game', {
    auth: {
        token: "abcd"
    }
});
// export const testSocket = io.connect('http://localhost:5000/test');
// export const sockets = io.connect('http://localhost:5000');
// export const socket = io.connect('http://localhost:5000', {
//   extraHeaders: {
//     "socket-auth": 'asd123'
//   }
// });