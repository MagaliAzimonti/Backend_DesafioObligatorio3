const ProductManager = require('../ProductManager');
const fs = require('fs');
const express = require('express');
const PORT = 8080;
let app = express();
const path = new ProductManager('productos.json');


app.get('/products/', async (req, res) => {
    let stock = await path.getProducts()
    stock.length > 0 ? res.json(stock) : res.send({error: "product not found"})
});

app.get('/products/:pid', async (req, res) => {
    try {
        let product = await path.getProductById(req.params.id)
        if (product) {
            res.json({ product })
        } else {
            res.send({ error: "product not found" })
        }
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))

/* let connected_server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
connected_server.on('error', error => console.log(error)) */

