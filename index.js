const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { addSale, getSales, getStat, getRandomAmount } = require('./utils/sales');
const { runSales, stopSales } = require('./utils/run');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/sales', (req, res) => {
    const sale = addSale({ amount: req.query.amount });

    const namespace = io.of("/dashboard");
    namespace.emit('stat', getStat());

    res.status(201).send(sale);
});


const workspace = io.of('/dashboard');

workspace.on('connection', socket => {
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

    socket.emit('stat', getStat());
});


http.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});
