var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var conn = mongoose.createConnection('mongodb://54.197.79.57:27017/shard')
//main_db = mongoose.createConnection('mongodb://3.235.103.102:27017/atelier');// defaults to port 27017
conn
const { logExecutionTime, LoggerVerbosity } = require('mongoose-execution-time');

mongoose.plugin(logExecutionTime, {
  loggerVerbosity: LoggerVerbosity.Normal,
  loggerLevel: 'info'
});


const cartSchema = new Schema({
  sku_id: {type: Number},
  count: Number
})


const second_cartModel = conn.model('Second_Cart', cartSchema)




module.exports.add_to_cart = async (new_sku_id) =>{
  console.log("second", new_sku_id)
  if(Object.keys(new_sku_id).length === 0) {console.log("null"); return}


  second_cartModel.find({sku_id: new_sku_id.sku_id})
  .exec(async function (err, cart) {
    console.log("first cart", cart)
    if(cart.length > 0){
      console.log("cart", cart)
      new_count = cart[0].count + 1
      console.log("new count", new_count)
      temp = await second_cartModel.findOneAndUpdate({sku_id: new_sku_id.sku_id}, {count:new_count })
    } else{
      sku = new second_cartModel({sku_id : new_sku_id.sku_id, count: 1})
      sku.save()
       .catch((err)=>{
        console.log(err, "err")
       })
      console.log("hello")
    }
});
}





