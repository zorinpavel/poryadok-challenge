const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // support encoded bodies

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { addSale, getSales, getStat, getRandomAmount } = require('./utils/sales');
const { runSales, stopSales } = require('./utils/run');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/sales', (req, res) => {
    const { error, sale } = addSale({ amount: req.query.sales_amount });

    const namespace = io.of("/dashboard");
    namespace.emit('stat', getStat());

    if(error)
        res.status(400).send({ error });
    else
        res.status(201).send(sale);
});


app.post('/sales', (req, res) => {
    const { error, sale } = addSale({ amount: req.body.sales_amount });

    const namespace = io.of("/dashboard");
    namespace.emit('stat', getStat());

    if(error)
        res.status(400).send({ error });
    else
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
