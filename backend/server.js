import express from 'express';
import cors from "cors"
import data from './data.js';

const app = express();

app.use(cors())
//resuesta para la soliciutd de productos
app.get('/api/products', (req, res) => {
    res.send(data.products)
})
//soliciutd para producto
app.get('/api/products/slug/:slug', (req, res) => {
    //hallar el preduct segun el request
    const product = data.products.find(p => p.slug === req.params.slug)
    //si existe lo devuelvo
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }
})
//id y count stock 

app.get("/api/products/:id", function (req, res) {
    //busco el rpoducto segun su id
    const product = data.products.find(p => p._id === req.params.id);
    //si existe lo devuelvo
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product not found" })

    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`servert at http://localhost:${port}`)
});

