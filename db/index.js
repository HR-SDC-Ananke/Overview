var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/products');

const productSchema = new Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: Array,
  styles: Array,
  related : Array
})

const productModel = mongoose.model('Product', productSchema  )


const add_product = async (product) =>{

  //console.log(product.product_id)
  console.log("1")
  var products = new productModel(product)
  console.log('2')
 // console.log(products)

 return  products.save()
    .then((result) =>{
      console.log('3')
      console.log(result, "result")
    })
}

module.exports.add_product = add_product