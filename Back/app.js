const express = require('express')
const app = express()
const port = 5000

app.use(express.json());
app.get('/', (req, res) => res.send('Hello'))

app.get('/api/stock', (req, res) => {
    if (stock.length > 0) {
        const messageToSend = { data: stock, message: 'Current stocklist sent' };
        res.status(200).send(messageToSend);
    }
    else {
        res.status(204).send('No stock available');
    }
})
app.get('/api/stockvalue', (req, res) => {
    var totalvalue = 0;
    var validdata = true;
    stock.forEach(item => {
        if (item.currency == 'EUR') {
            totalvalue += item.price * item.quantity;
        }
        else if (item.currency == 'USD') {
            totalvalue += item.price * item.quantity * USDtoEUR;
        }
        else if (item.currency == 'GBP') {
            totalvalue += item.price * item.quantity * GBPtoEUR;
        }
        else {
            validdata = false;
        }
    });
    if (validdata) {
        const messageToSend = { data: totalvalue, message: 'Current price of all stock in Euros' };
        res.status(200).send(messageToSend);
    }
    else res.status(400).send('Unrecognised currency');
})
app.post('/api/stock', (req, res) => {
    if (validatestock(req.body.data)) {
        const newstock = {
            id: stock.length,
            name: req.body.data.name,
            description: req.body.data.description,
            price: req.body.data.price,
            currency: req.body.data.currency,
            quantity: req.body.data.quantity
        };

        stock.push(newstock);
        res.status(200).send(stock);
    }
    else res.status(400).send('Incorrect format of new stock');
})
app.delete('/api/stock/:id', (req, res) => {
    const stockToDelete = stock.find(item => item.id === parseInt(req.params.id));
    if (!stockToDelete) {
        res.status(404).send("Course with given id wasn't found");
    }
    const index = stock.indexOf(stockToDelete);
    stock.splice(index, 1);
    res.send(stock);

})
//Assumes all currency is either EUR, USD or GBP
var stock = [
    { id: 0, name: 'Candyfloss', description: 'Sweet and tasty sugar', price: 1.20, currency: 'USD', quantity: 350 },
    { id: 1, name: 'Cinnamon Rolls', description: 'Naughty Christmas treat', price: 3.50, currency: 'EUR', quantity: 1000 },
    { id: 2, name: 'Chocolate', description: 'Chocolatey goodness', price: 1.50, currency: 'GBP', quantity: 100 },
    { id: 3, name: 'Sweets', description: 'Good for teeth', price: 0.99, currency: 'EUR', quantity: 650 },
    { id: 4, name: 'Eggnog', description: 'Gross', price: 3.99, currency: 'USD', quantity: 900 },
    { id: 5, name: 'Vodka', description: 'Very noice', price: 15.00, currency: 'EUR', quantity: 25 }
]
const validatestock = function (newstock) {
    if (newstock.hasOwnProperty("name") && newstock.hasOwnProperty("description") && newstock.hasOwnProperty("price") && newstock.hasOwnProperty("currency") && newstock.hasOwnProperty("quantity")) {
        if (newstock.currency === "EUR" || newstock.currency === "USD" || newstock.currency === "GBP") {
            if (newstock.price > 0 && newstock.quantity > 0) {
                return true;
            }
        }
    }
    else return false;
}
const USDtoEUR = 0.90;
const GBPtoEUR = 1.17;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

