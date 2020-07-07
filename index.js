const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { runSales, stopSales } = require('./utils/runSales');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Dashboard connected');

    socket.on('run', () => {
        runSales(socket);
    });

    socket.on('stop', () => {
        stopSales();
    });

    socket.on('disconnect', () => {
        stopSales();
    });

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
