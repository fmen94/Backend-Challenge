const express = require('express');
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const getProducts = require("../helpers/getProducts.helper")
const setProducts = require("../helpers/saveProduct.helper")
const validateProducts = require("../middlewares/validateProducst")
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/products/bulk_insert', validateProducts, (req, res, next) => {
  setProducts(myCache, req.body.products)
  res.status(200).send({ "status": "OK" })
})
router.get('/products', (req, res, next) => {
  let products = getProducts(myCache)
  if (products) {
    res.status(200).send({
      "products": products
    })
  } else {
    res.status(404).json({
      "Error": "Products not found"
    })
  }

})
module.exports = router;
