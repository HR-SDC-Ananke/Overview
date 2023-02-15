

const { find } = require('../db')
const db = require('../db/index')
const db2 = require('../db/second_index')

var style = (product) =>{
  for(var i = 0 ; i <= product.styles.length-1; i++){
    if(product.styles[i].photos.length === 0 ){
      product.styles[i].photos.push({thumbnail_url: null})
    } else {
      for(photo of product.styles[i].photos){
        photo.url = photo.url.replace(/["]+/g, '')
        photo.thumbnail_url = photo.thumbnail_url.replace(/["]+/g, '')
      }
    }
    if(product.styles[i].sku.length > 0 ){
      temp_sku = product.styles[i].sku
      delete product.styles[i].sku
      product.styles[i].skus = temp_sku




      for(skus of product.styles[i].skus){

        temp_qty =skus.qty
        delete skus.qty
        skus.quantity = temp_qty

        skus.quantity = skus.quantity.replace(/["]+/g, '')
        skus.size = skus.size.replace(/["]+/g, '')
      }
    }

  }
  var styles = {results: product.styles}
  return styles
}


const product = async (req,res) => {
  var ans
  var result_product = await db.find(req.params.id)
  console.log("hi")
  if(result_product === null){
    res.status(401)
    res.send('product not found')
  } else{
      var url = req.url.split('/')[3]
      ans= (url === 'styles' ?  style(result_product) : result_product)
      res.status(200)
      res.send(ans)

  }

}



exports.cart = async (req, res) => {
  console.log(req.body)
  if(req.body.sku_id <4){
    var addToCart = await db2.add_to_cart(req.body)
  }
  // } else{
  //   var addToCart = await db.add_to_cart(req.body)
  // }

  console.log("after ")
  res.send()
}






module.exports.product = product
// module.exports.cart = cart