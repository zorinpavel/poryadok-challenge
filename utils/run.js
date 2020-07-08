const { addSale, getSales, getStat, getRandomAmount } = require('./sales.js');
let isRunning = true;

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runSales = async (socket) => {
    isRunning = true;
    while(isRunning) {
        const sale = addSale({ amount: getRandomAmount(10, 5000) })
        socket.emit('stat', getStat());

        await sleep(getRandomAmount(10, 1000));
    }
};

const stopSales = () => {
    isRunning = false;
}


module.exports = { runSales, stopSales };
