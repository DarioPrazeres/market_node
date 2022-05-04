var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema(
    {
        name:{type:String, required:true},
        category: {type:Schema.Types.ObjectId, ref:'Category', required: true},
        disc:{type:String, required:true},
        qtd:{type:Number, min:0, required:true},
        price:{type:Number, required:true}
    }
);
ProductSchema.virtual('url').get(function(){
    return '/invetory/product/'+ this._id;
})
module.exports = mongoose.model('Product', ProductSchema);