var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var conn = mongoose.createConnection('mongodb://3.235.103.102:27017/atelier')
//main_db = mongoose.createConnection('mongodb://3.235.103.102:27017/atelier');// defaults to port 27017

conn

const { logExecutionTime, LoggerVerbosity } = require('mongoose-execution-time');

mongoose.plugin(logExecutionTime, {
  loggerVerbosity: LoggerVerbosity.Normal,
  loggerLevel: 'info'
});

const productSchema = new Schema({
  product_id:{type: Number, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: Array,
  styles: Array,
  related : Array
})

const cartSchema = new Schema({
  sku_id: {type: Number},
  count: Number
})

const productModel = conn.model('Product', productSchema  )
const cartModel = conn.model('Cart', cartSchema)



const add_product = async (product) =>{

  var products = new productModel(product)

 return  products.save()
    .then((result) =>{
      console.log(result, "result")
    })
}

const find = async (id) =>{
  const style = await productModel.findOne({product_id: id}).exec()
  return style
}

module.exports.add_to_cart = async (new_sku_id) =>{
  if(Object.keys(new_sku_id).length === 0) {console.log("null"); return}



  cartModel.find({sku_id: new_sku_id.sku_id})
  .exec(async function (err, cart) {
    console.log("first cart", cart)
    if(cart.length > 0){
      console.log("cart", cart)
      new_count = cart[0].count + 1
      console.log("new count", new_count)
      temp = await cartModel.findOneAndUpdate({sku_id: new_sku_id.sku_id}, {count:new_count })
    } else{
      sku = new cartModel({sku_id : new_sku_id.sku_id, count: 1})
      sku.save()
       .catch((err)=>{
        console.log(err, "err")
       })
      console.log("hello")
    }
});
}





module.exports.add_product = add_product
module.exports.find = find