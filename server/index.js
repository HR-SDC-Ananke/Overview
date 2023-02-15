const express = require('express')
const app = express()
const product = require('./controller')
require('dotenv').config()
var cors = require('cors')

const port = process.env.NODE_ENV !== 'test'? process.env.PORT || 3033 : 0

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/products/:id/styles', product.product)
app.get('/products/:id', product.product)
app.post('/add_cart', product.cart)

app.get(`/loaderio-11abd307d55ab3738346da3c3d2c3939`,  (req, res) => {
  console.log("hi")

   res.send('loaderio-11abd307d55ab3738346da3c3d2c3939');
 });



var server = app.listen(port, () => console.log(`Listening on port ${port}`))



module.exports.app = app
module.exports = server