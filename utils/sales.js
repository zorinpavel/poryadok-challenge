let sales = [];

const addSale = ({ amount }) => {
    amount = Math.round((parseFloat(amount) + Number.EPSILON) * 100) / 100;

    if(!amount) {
        return {
            error: 'Amount can\t be less 0'
        }
    }

    const sale = {
        amount,
        createdAt: new Date().getTime()
    }

    sales.push(sale)

    return { sale }
}


const getRandomAmount = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}


const getSales = () => {
    return sales.filter(sale => {
        return sale.createdAt > new Date(new Date().getTime() - 60000).getTime();
    })
}


const getStat = () => {
    let total_sales_amount = 0;
    let average_amount_per_order = 0;
    let total_sales_count = 0;

    const sales = getSales();

    sales.forEach(sale => {
        total_sales_amount = Math.round((total_sales_amount + sale.amount) * 100) / 100;
        average_amount_per_order = Math.round((total_sales_amount / sales.length) * 100) / 100;
        total_sales_count = sales.length;
    });

    return {
        total_sales_amount,
        average_amount_per_order,
        total_sales_count
    }
}


module.exports = {
    addSale,
    getSales,
    getStat,
    getRandomAmount
}
