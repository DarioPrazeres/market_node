var express = require('express');
var router = express.Router();
var path = require('path');
var Category = require('../models/category')
/* GET home page. */
router.get('/', function(req, res, next) {
  Category.find().sort({name: 1}).exec(function(err, list_category){
    if(err){
      return next(err);
    }
    console.log(list_category);
    res.render('index', {title: 'Home', list: list_category});
  });  
});
module.exports = router;
