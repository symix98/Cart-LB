// import controllers review, products
const productController = require('../../components/product/ProductController');


// router
const router = require('express').Router()

router.get('/product', productController.getAllProduct);
router.get('/product/:id', productController.getSingleProductById);
router.post('/product/create', productController.createNewProduct);
router.put('/product/update/:pid', productController.updateProduct);
router.post('/product/search', productController.searchProductResult);
module.exports = router