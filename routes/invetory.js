var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var category_controller = require('../controllers/categoryController');
//Router Product
router.get('/products', product_controller.product_list);
router.get('/product/:id', product_controller.product_detail);
//Router Product Create
router.get('/products/create', product_controller.product_create_get);
router.post('/products/create', product_controller.product_create_post)
//Router Product Update
router.get('/product/:id/update', product_controller.product_update_get);
router.post('/product/:id/update', product_controller.product_update_post);
//Router Product Delete
router.get('/product/:id/delete', product_controller.product_delete_get);
router.post('/product/:id/delete', product_controller.product_delete_post);

//Router Category
router.get('/categories', category_controller.category_list);
router.get('/category/:id', category_controller.category_detail);
//Router Create New Category
router.get('/categories/create', category_controller.category_create_get);
router.post('/categories/create', category_controller.category_create_post);
//Router Delete Category 
router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);
//Router Update Category
router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post) 

module.exports = router;