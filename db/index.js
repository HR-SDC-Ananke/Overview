var mongoose = require('mongoose')
var Schema = mongoose.Schema;

cart_shard_1 = mongoose.createConnection('mongodb://54.197.79.57:27017/shard')
main_db = mongoose.createConnection('mongodb://3.235.103.102:27017/atelier');// defaults to port 27017

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

const productModel = main_db.model('Product', productSchema  )
const main_cartModel = main_db.model('Cart', cartSchema)
const shard_cartModel = cart_shard_1.model('Cart', cartSchema)


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

  if(new_sku_id.sku_id < 4){
    var con = main_cartModel
  } else{
    var con = shard_cartModel
  }
  // sku= await con.find({sku_id: new_sku_id.sku_id})
  // console.log("db sku", new_sku_id)
  // console.log("sku", sku)

  // if(sku.length === 0 ){
  //   console.log("no")
  //   sku = new con({sku_id : new_sku_id.sku_id, count: 1})
  //   console.log(sku)
  //   temp = await sku.save()
  //   return
  // } else{
  //   console.log('yes')
  //   var new_count = sku[0].count + 1
  //   console.log(new_count)
  //   sku = await con.findOneAndUpdate({sku_id: new_sku_id.sku_id}, {count:new_count })
  // }

  con.find({sku_id: new_sku_id.sku_id})
  .exec(async function (err, cart) {
    console.log("first cart", cart)
    if(cart.length > 0){
      console.log("cart", cart)
      new_count = cart[0].count + 1
      console.log("new count", new_count)
      temp = await con.findOneAndUpdate({sku_id: new_sku_id.sku_id}, {count:new_count })
    } else{
      sku = new con({sku_id : new_sku_id.sku_id, count: 1})
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