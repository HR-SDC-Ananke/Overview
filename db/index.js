var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect('mongodb://3.235.103.102/atelier');// defaults to port 27017
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
  sku_id: {type: Number, unique: true},
  count: Number
})

const productModel = mongoose.model('Product', productSchema  )
const cartModel = mongoose.model('Cart', cartSchema)


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
  console.log(new_sku_id)
  sku= await cartModel.find({sku_id: new_sku_id.sku_id}).exec()
  console.log("db sku", sku)
  if(sku.length === 0){
    console.log("no")
    sku = new cartModel({sku_id : new_sku_id.sku_id, count: 1})
    console.log(sku)
    return sku.save()
      .then((result) =>{
        console.log(result, "result")
      })
  } else{
    console.log('yes')
    var new_count = sku[0].count + 1
    console.log(new_count)
    sku = await cartModel.findOneAndUpdate({sku_id: new_sku_id.sku_id}, {count:new_count })
  }


}




module.exports.add_product = add_product
module.exports.find = find