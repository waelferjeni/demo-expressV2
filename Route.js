const express = require('express')
const app = express()
const products = require('./data.js')
const products_routes = require('./routes/products.js')


app.use(express.json())
app.use('/api/products', products_routes)

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})