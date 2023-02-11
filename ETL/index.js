const fs = require('fs')
const { parse } = require("csv-parse");
const db = require("../db/index")



var products = {}




fs.createReadStream('./CSV/product.csv')
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    products[row[0]] = {
      product_id: row[0],
      name: row[1],
      slogan: row[2],
      description: row[3],
      category: row[4],
      default_price: row[5],
      features:[],
      styles: [],
      related : []
    }
  })
  .on("end", function () {
    console.log("finished product");
    read_features()
  })
  .on("error", function (error) {
    console.log(error.message);
  });


  const read_features = function(){
    fs.createReadStream('./CSV/features.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      products[row[1]].features.push({
        feature: row[2],
        value: row[3]
      })
    })
    .on("end", function () {
      console.log("finished features");
      read_styles()
    })
    .on("error", function (error) {
      console.log(error.message);
    });
  }

  const read_styles = function(){
    fs.createReadStream('./CSV/styles.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      products[row[1]].styles.push({
        style_id: row[0],
        name: row[2],
        sales_price: row[3],
        original_price: row[4],
        default_style: row[5],
        photos:[],
        sku:[]
      })
    })
    .on("end", function () {
      console.log("finished styles");
      read_photos()
    })
    .on("error", function (error) {
      console.log(error.message);
    });

  }



  const read_photos = function(){
    var styles_index
    fs.createReadStream('./CSV/photos.csv')
    .pipe(parse({ delimiter: ",", from_line: 1, quote: '' }))
    .on("data", function (row) {
      if(products[row[0]]){
        for(var i = 0; i <products[row[0]].styles.length; i++){
          if(products[row[0]].styles[i].style_id = row[1].toString()){
              styles_index = i
              break;
          }
        }
        if(products[row[0]].styles[styles_index]){
          products[row[0]].styles[styles_index].photos.push({
            url: row[2],
            thumbnail_url: row[3]
          })
        }
      }
    })
    .on("end", function () {
      console.log("finished photos");
      read_sku()
    })
    .on("error", function (error) {
      console.log(error.message, "photos");
    });

  }

  const read_sku = function(){

    var styles_index
    fs.createReadStream('./CSV/skus.csv')
    .pipe(parse({ delimiter: ",", from_line: 1, quote: '' }))
    .on("data", function (row) {
      if(products[row[0]]){
        for(var i = 0; i <products[row[0]].styles.length; i++){
          if(products[row[0]].styles[i].style_id = row[1].toString()){
              styles_index = i
              break;
          }
        }
        if(products[row[0]].styles[styles_index]){
          products[row[0]].styles[styles_index].sku.push({
            size: row[2],
            qty: row[1]
          })
        }
      }
    })
    .on("end", function () {
      console.log("finished skus");
      read_related()

    })
    .on("error", function (error) {
      console.log(error.message);
    });

  }

  const read_related = function(){
    fs.createReadStream('./CSV/related.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      products[row[1]].related.push(row[2])
    })
    .on("end", function () {
      console.log("finished related");
      addToDb()
    })
    .on("error", function (error) {
      console.log(error.message);
    })
  }

  const addToDb = async function(){
    console.log("add to do")
    keys = Object.keys(products)
    for(var i = 0; i<keys.length; i++){
      await db.add_product(products[keys[i]])
    }
  }