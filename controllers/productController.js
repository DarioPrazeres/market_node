var Product = require('../models/product');
var Category = require('../models/category');
var async = require('async');
const {body, validationResult} = require('express-validator')
exports.product_list = function(req, res, next){
    async.parallel({
        product: function(callback){
            Product.find({}, 'name category').populate('category').exec(callback);
        },
        category: function(callback){
            Category.find(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        if(results.product == null){
            var err = new Error('Product Not Found');
            err.status = 404;
            return next(err); 
        }
        res.render('product_list', {title: 'Product List', list_category: results.category, list_product: results.product});
    });
}
exports.product_detail = function(req, res, next){
   async.parallel({
       product: function(callback){
           Product.findById(req.params.id)
            .populate('category')
            .exec(callback);
       },
   }, function(err, result){
       if(err){return next(err);}
       if(result.product==null){
           var err = new Error('Product not Found');
           err.status = 404;
           return next(err);
       }
       res.render('product_detail', {title:'Product Detail', product: result.product})
   });
}
exports.product_create_get = function(req, res, next){
    async.parallel({
        category: function(callback){
            Category.find(callback);
        },
    }, function(err, result){
        if(err){return next(err);}
        res.render('product_form', {title: 'Create Product', categorys: result.category});
    });
}
exports.product_create_post = [
    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('category', 'Category must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('disc', 'Dicription must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('qtd', 'Quatity must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('price', 'Price must not be empty.').trim().isLength({ min: 1 }).escape(),

    (req, res, next) =>{
        const errors = validationResult(req);
        var product = new Product(
            {
                name: req.body.name, 
                category:req.body.category,
                disc: req.body.disc, 
                qtd: req.body.qtd,
                price: req.body.price
            }
        );

        if(!errors.isEmpty()){
            async.parallel({
                category: function(callback){
                    Category.find(callback);
                },
            }, function(err, result){
                if(err){return next(err);}
                res.render('product_form', {title: 'Create Product', categorys: result.category, errors: errors.array()});
            });
            return;
        }
        else{
            product.save(function(err){
                if(err){return next(err)}
                res.redirect(product.url)
            })
        }
    }
]
exports.product_delete_get = function(req, res, next){
    async.parallel({
        product: function(callback){
            Product.findById(req.params.id).populate('category').exec(callback);
        }
    }, function(err, result){
        if(err){
            return next(err);
        }
        if(result.product==null){
            res.redirect('/invetory/categories');
        }
        res.render('product_delete', {title:'Delete Product',product: result.product})
    });
}
exports.product_delete_post = [function(req, res, next){
    async.parallel({
        product: function(callback){
            Product.findById(req.params.id).populate('category').exec(callback);
        }
    }, function(err, result){
        if(err){
            return next(err);
        }
        if(result.product.length > 0){
            res.render('product_delete', {title:'Delete Product',product: result.product});
            return;
        }
        else{
            Product.findByIdAndRemove(req.body.productid, function deleteProduct(err){
                res.redirect('/invetory/products');
            });
        }
    });
}]
exports.product_update_get = function(req, res, next){
    async.parallel({
        product: function(callback){
            Product.findById(req.params.id).populate('category').exec(callback);
        },
        category: function(callback){
            Category.find(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        if(results.product == null){
            var err = new Error('Product Not Found');
            err.status = 404;
            return next(err); 
        }
        res.render('product_form', {title: 'Update Product', categorys: results.category, product: results.product});
    });
}
exports.product_update_post = [
    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('category', 'Category must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('disc', 'Dicription must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('qtd', 'Quatity must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('price', 'Price must not be empty.').trim().isLength({ min: 1 }).escape(),  

    (req, res, next) =>{
        const errors = validationResult(req);
        var product = new Product(
            {
                name: req.body.name, 
                category:req.body.category,
                disc: req.body.disc, 
                qtd: req.body.qtd,
                price: req.body.price,
                _id:req.params.id
            }
        );

        if(!errors.isEmpty()){
            async.parallel({
                category: function(callback){
                    Category.find(callback);
                },
            }, function(err, result){
                if(err){return next(err);}
                res.render('product_form', {title: 'Update Product', categorys: result.category, errors: errors.array()});
            });
            return;
        }
        else{
            Product.findByIdAndUpdate(req.params.id, product, {},function(err, theproduct){
                if(err){return next(err);}
                res.redirect(theproduct.url);
            })
        }
    }
]